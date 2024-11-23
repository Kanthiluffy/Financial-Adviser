const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Survey = require('../models/survey');
const sendOTP = require('../config/otpService');
const sendEmailReport = require('../services/emailService');
const dotenv = require('dotenv');
const authMiddleware = require('../middlewares/authMiddleware');

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


router.post('/loginemail', async (req, res) => {
  const { email, name } = req.body;
  const otp = generateOTP();

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // If the user is new, the name must be provided
      if (!name) {
        return res.status(400).json({ message: 'Name is required for new users' });
      }

      user = new User({ email, name });
    } else {
      // Existing users retain their current name
      console.log(`Existing user: ${email}`);
    }

    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();

    // Send OTP
    await sendEmailReport(email, otp);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
});

router.post('/verifyemail', async (req, res) => {
  const { email, otp} = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    const user = await User.findOne({ email });

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

router.get('/user', authMiddleware, async (req, res) => {
  try {
    console.log("IN user");
    // Fetch user details
    const user = await User.findById(req.user.id).select("name email");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the most recently updated survey for the user
    const latestSurvey = await Survey.findOne({ user: req.user.id })
      .sort({ updatedAt: -1 }) // Sort by `updatedAt` in descending order
      .select("updatedAt");

    res.json({
      name: user.name,
      email: user.email,
      lastUpdated: latestSurvey?.updatedAt || null, // Include `lastUpdated` if a survey exists
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post('/check-user', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    res.status(200).json({ exists: !!user }); // Respond with `true` if the user exists
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ message: 'Error checking user existence' });
  }
});


module.exports = router;
