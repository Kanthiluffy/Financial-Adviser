import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import CSS file

export default function Login({ onOtpSent }) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      setErrorMessage(''); // Reset error message before making the request
      console.log('Sending OTP for email: '+process.env.REACT_APP_API_URL +" "+  email); // Log for debugging

      const pendingSurvey = JSON.parse(localStorage.getItem('pendingSurvey'));
      const name = pendingSurvey?.name || ''; // Get the name only if survey data exists

      // Check if the user is already registered
      const userExistsResponse = await axios.post(process.env.REACT_APP_API_URL+'/api/auth/check-user', { email });
      const isNewUser = !userExistsResponse.data.exists;

      const payload = { email };
      if (isNewUser) {
        payload.name = name; // Add name only for new users
      }

      // Make an API call to send OTP
      await console.log(process.env.REACT_APP_API_URL);
      const response = await axios.post(process.env.REACT_APP_API_URL+'/api/auth/loginemail', payload);
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
