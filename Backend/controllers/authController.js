const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const JWT_SECRET = process.env.JWT_SECRET;

// Registr user
const registerUser = async (req,res) => {
    try {
        const { name, email, password, phone } = req.body;
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.json({success:false,message: "User already exists"})
        }

        // Validate registered data
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if (password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password"})
        }

        // hashing user password
        const hashedPassword = await bcrypt.hash(password, 12);

        // creating new user with the userModel
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
            phone:phone
        });
        await newUser.save();
        res.status(201).json({success:true,message: "User registration successful"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message: "Error"});
    }
}

// Login user
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        
        // Check for existing user
        if (!user) {
            return res.status(404).json({success:false,message: "User doesn't exist"});
        }

        // validating password
        const isPasswordvalid = await bcrypt.compare(password, user.password);
        if (isPasswordvalid) {
            // Generate JWT token
            const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: '2h'});
            return res.status(200).json({success:true, message: "Login successful", token, userId: user._id});
        }
        else {
            return res.status(404).json({success:false, message: "Invalid credentials"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message: "Error"});
    }
}

module.exports = { registerUser, loginUser }