import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

export const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;
        console.log(username, email, password)
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        })
        const savedUser = newUser.save()
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

export const login = async(req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({email: email})
        if (!user) return res.status(400).json({msg: "User doesn't exist"});

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({msg: "Password incorrect"});
        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1h"});
        delete user.password;
        res.status(200).json({token: token, id: user._id })

    } catch(error) {
        res.status(500).json({error: new Error("Invalid Request!")})
    }
}