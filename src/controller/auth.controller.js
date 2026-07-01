const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service.js");


/**
 * - Register user controller
 * - Url(api/auth/register)
 */

async function register(req, res) {
    const { name, email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });  
    }

    // Create a new user
    try {
    const newUser = await userModel.create({ name, email, password });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
    
        // await newUser.save();
        res.cookie("token",token);
        emailService.sendRegisterationEmail(newUser.email, newUser.name);
        return res.status(201).json({ user : {_id: newUser._id, name: newUser.name, email: newUser.email}, token });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};

/**
 * - Login user controller
 * - Url(api/auth/login)
 */

async function login(req, res){
    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select("password");

    if(!user){
        return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isAuthenticate = await user.comparePassword(password);

    if(!isAuthenticate){
        return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token",token);
    return res.status(200).json({ user : {_id: user._id, name: user.name, email: user.email}, token });

}

module.exports = { register, login };