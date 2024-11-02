import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import CSS file

export default function Login({ onOtpSent }) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      setErrorMessage(''); // Reset error message before making the request
      console.log('Sending OTP for email:', email); // Log for debugging

      // Make an API call to send OTP
      const response = await axios.post('http://localhost:5000/api/auth/loginemail', { email });
      console.log('API Response:', response.status, response.data);

      if (response.status === 200) {
        onOtpSent(email); // Move to OTP verification
      } else {
        setErrorMessage('Unexpected response. Please try again.');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error sending OTP. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Sign In</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleLogin} className="login-button">Send OTP</button>
      </div>
    </div>
  );
}
