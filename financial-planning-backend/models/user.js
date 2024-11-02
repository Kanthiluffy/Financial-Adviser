const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpiresAt: { type: Date },  // Expiry time for OTP
  isVerified: { type: Boolean, default: false }, // Flag to verify if user has been authenticated
  isAdmin: { type: Boolean, default: false }  
});

const User = mongoose.model('User', userSchema);
module.exports = User;
