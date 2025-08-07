// controllers/authController.js
import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

/**
 * POST /api/auth/signup
 * Public  – Register a new user
 * 
 */
const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'Lax'
};


export const signUp = async (req, res) => {
  try {
    const { channelName, userName, password, about, profilePic } = req.body;

    // avoid duplicate usernames
    if (await User.findOne({ userName })) {
      return res.status(400).json({ error: "Username already exists", success: false });
    }

    // hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      channelName,
      userName,
      password: hashedPassword,
      about,
      profilePic,
    });

    res.status(201).json({ message: "User registered", success: true, data: newUser });
  } catch (err) {
    console.error("Sign‑up error:", err);
    res.status(500).json({ error: "Server error", success: false });
  }
};

/**
 * POST /api/auth/login
 * Public  – Authenticate user
 */
export const signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials", success: false });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, cookieOptions,{
      httpOnly: true,
      secure: false,           // true only in production with HTTPS
      sameSite: "Lax",         // or "None" if frontend is on different domain
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(200).json({ message: "Login successful", success: true, data: user, token, user });
  } catch (err) {
    console.error("Sign-in error:", err);
    res.status(500).json({ error: "Server error", success: false });
  }
};
export const logout = async (req, res) => {
  res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' });
}