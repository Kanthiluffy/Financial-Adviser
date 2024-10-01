import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';  // Import the stylesheet for styling

const Login = ({ onOtpSent }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
        console.log(mobileNumber);
      // Send the mobile number to backend to generate an OTP
      await axios.post('http://localhost:5000/api/auth/login', { mobileNumber });
      
      onOtpSent(mobileNumber);  // Proceed to OTP verification step
    } catch (error) {
      setErrorMessage('Error sending OTP. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter mobile number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <button onClick={handleLogin}>Send OTP</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Login;
