const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const sendOTP = require('../config/otpService');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Login route (send OTP to mobile)
router.post('/login', async (req, res) => {
  const { mobileNumber } = req.body;
  const otp = generateOTP();
  console.log(mobileNumber);
  try {
    let user = await User.findOne({ mobileNumber });

    // If user doesn't exist, create new user
    if (!user) {
      user = new User({ mobileNumber });
    }

    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000;  // OTP valid for 10 minutes

    await user.save();
    console.log("IM here 1");
    // Send OTP
    await sendOTP(mobileNumber, otp);
    console.log("IM here 2");

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
});

router.post('/verify', async (req, res) => {
  const { mobileNumber, otp } = req.body;

  if (!mobileNumber || !otp) {
    return res.status(400).json({ message: 'Mobile number and OTP are required' });
  }

  try {
    const user = await User.findOne({ mobileNumber });

    if (!user || user.otp !== otp || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // OTP is correct, generate JWT
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;  // Clear OTP after verification
    user.otpExpiresAt = undefined;
    await user.save();

    // Return token and admin status
    res.status(200).json({ token, userId: user._id, isAdmin: user.isAdmin, message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error });
  }
});

module.exports = router;
