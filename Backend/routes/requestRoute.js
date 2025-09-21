const express = require('express');
const { bloodRequest } = require('../controllers/requestController.js');
const requestModel = require('../models/requestModel.js');
const nodemailer = require('nodemailer');

// create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// verify transporter on the server
transporter.verify().then(() => {
    console.log('Mail transporter ready.');    
}).catch(err => {
    console.log('Mail transport error: ',err);
})

const requestRouter = express.Router();

requestRouter.post('/requestBlood',bloodRequest);
requestRouter.get('/',async (req,res) => {
    try {
        const requests = await requestModel.find().sort({ createdAt:-1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({success:false,message:"Error"});
        console.log(error);
    }
});
requestRouter.post('/:id/accept',async (req,res) => {
    try {
        const {id} = req.params;
        const request = await requestModel.findById(id);
        if (!request) {
            return res.status(404).json({success:false, message:"Request not found"});
        }

        // update status
        request.status = 'accepted';
        await request.save();

        //prepare email
        const mailOptions = {
            from: `<${process.env.EMAIL_USER}>`,
            to: request.attEmail,
            subject: 'Blood request accepted - YRC',
            html: `
                <p>Hi ${request.attName},</p>
                <p>Your blood request for the patient <strong>${request.patName}</strong> made on <strong>${request.date}</strong> has been accepted by YRC Blood team.</p>
                <p>Our volunteer will contact you at ${request.attPhone}.</p><br>
                <p>For more details, contact YRC Bloodline number: 9791162108</p>
                <strong> This is an auto-generated email. So dont reply. </strong>
                <br>
                <p>Regards,</p>
                <p>YRC, MIT</p>
            `
        };

        // send mail
        await transporter.sendMail(mailOptions);
        res.json({success: true, message: 'Request accepted and email sent.'});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error in sending mail"});
    }
});

module.exports = requestRouter;