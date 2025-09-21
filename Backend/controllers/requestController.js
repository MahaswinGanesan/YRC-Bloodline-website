const requestModel = require('../models/requestModel.js');
const express = require('express');
const nodemailer = require('nodemailer');

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

const bloodRequest = async (req, res) => {
    try {
        const {patName, patPhone, interests, group, units, date, hosName, hosAddress, attName, attPhone, attEmail, status, attRelation, createdAt} = req.body;
        if (patPhone.length != 10 || attPhone.length != 10) {
            res.json({success:false, message:"Please enter a valid Phone number"});
            return;
        }
        const newRequest = new requestModel({
            patName: patName,
            patPhone: patPhone,
            interests: interests,
            group: group,
            units: units,
            date: date,
            hosName: hosName,
            hosAddress: hosAddress,
            attName: attName,
            attPhone: attPhone,
            attEmail: attEmail,
            attRelation: attRelation,
            status: status,
            createdAt: createdAt
        });
        await newRequest.save(); 

        const mailOptions = {
            from: `<${process.env.EMAIL_USER}>`,
            to: newRequest.attEmail,
            subject: "Blood Request received - YRC Blood Team",
            html:`
                <p>Hi ${newRequest.attName},</p>
                <p>We have received your blood request for <strong>${newRequest.patName}</strong> made on <strong>${Date.now}</strong>.</p>
                <p>Our team will review and contact you shortly.</p>
                <br>
                <strong>This is an auto-generated email. Please do not reply.</strong>
                <p>Regards,</p>
                <p>YRC, MIT</p>
            `
        }

        await transporter.sendMail(mailOptions);
        res.status(201).json({success: true, message: "Request created and email sent."});
    
    }
    catch (error) {
        res.status(400).json({success:false, message:"Error"});
        console.log(error);
        
    }
}

module.exports = { bloodRequest }