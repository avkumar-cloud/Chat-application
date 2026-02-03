import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req,res) =>{
    const {username,email,password} = req.body;

    const userExists = await User.findOne({email});
    if(userExists) return res.status(400).json({message: "User already exist"});

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({username,password: hashedPassword,email});

    return res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email
    })
}

export const login = async(req,res) =>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(401).json({message: "Invalid credentials"})

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(401).json({message: "Invalid credentials"});

    const token = jwt.sign(
        {id: user},process.env.JWT_SECRET,{expiresIn: "7d"}
    )

    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token
    })
}