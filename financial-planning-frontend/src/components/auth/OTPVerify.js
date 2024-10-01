import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';  // Using the same stylesheet for consistency

const OTPVerify = ({ mobileNumber, onLoginSuccess }) => {
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerify = async () => {
    try {
      // Send the mobile number and OTP to the backend for verification
      const response = await axios.post('http://localhost:5000/api/auth/verify', {
        mobileNumber,
        otp
      });

      // Store the token in local storage
      const { token, isAdmin } = response.data;
      localStorage.setItem('token', token);

      // Pass the admin status to the parent to handle redirection
      onLoginSuccess(isAdmin);
    } catch (error) {
      setErrorMessage('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerify}>Verify OTP</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default OTPVerify;
