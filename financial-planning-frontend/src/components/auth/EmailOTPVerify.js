import React, { useState } from 'react';
import axios from 'axios';
import './OTPVerify.css'; // Import CSS file

export default function OTPVerify({email, onLoginSuccess }) {
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerify = async () => {
    try {
      setErrorMessage(''); // Reset error message before making the request
      console.log('Verifying OTP for mobile number:', email);

      // Make an API call to verify OTP
      const response = await axios.post('http://localhost:5000/api/auth/verifyemail', {
        email,
        otp,
      });

      console.log('API Response:', response.status, response.data);

      if (response.status === 200) {
        const { token, isAdmin } = response.data;
        localStorage.setItem('token', token); // Store the token
        onLoginSuccess(isAdmin); // Redirect based on login success
      } else {
        setErrorMessage('Unexpected response. Please try again.');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-box">
        <h1>Verify OTP</h1>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="otp-input"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleVerify} className="otp-button">Verify OTP</button>
      </div>
    </div>
  );
}
