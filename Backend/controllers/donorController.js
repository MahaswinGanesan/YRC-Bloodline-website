const donorModel = require('../models/donorModel.js');
const express = require('express');

const bloodDonor = async (req, res) => {
    try {
        const {name, regno, dept, year, date, phone, patName} = req.body;
        let containNumber = /\d/.test(name);
        if (containNumber) {
            res.json({success:false, message:"Name shouldn't have any number"});
            return;
        }
        containNumber = /\d/.test(patName);
        if (containNumber) {
            res.json({success:false, message:"Name shouldn't have any number"});
            return;
        }
        if (phone.length != 10) {
            res.json({success:false, message:"Please enter a valid Phone number"});
            alert("Phone number must be 10 digit. Dont use any code before it.")
            return;
        }
        const newDonor = new donorModel({
            name: name,
            regno: regno,
            dept: dept,
            year: year,
            date: date,
            phone: phone,
            patName: patName
        });

        await newDonor.save();
        res.status(201).json({success:true, message:"Donor details saved"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Error"});
    }
}

module.exports = { bloodDonor };