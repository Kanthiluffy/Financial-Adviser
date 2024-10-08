import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import OTPVerify from './OTPVerify';

export default function LoginFlow() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [step, setStep] = useState('login');
  const navigate = useNavigate();

  const handleOtpSent = (mobile) => {
    setMobileNumber(mobile);
    setStep('verify');
  };

  const handleLoginSuccess = async (isAdmin) => {
    try {
      // Retrieve pending survey data from localStorage
      const pendingSurvey = JSON.parse(localStorage.getItem('pendingSurvey'));

      if (pendingSurvey) {
        // Get token
        const token = localStorage.getItem('token');

        // Submit the survey if pending data exists
        const response = await axios.post('http://localhost:5000/api/survey/submit', pendingSurvey, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 201) {
          console.log('Pending survey submitted successfully', response.data);

          // Clear the pending survey data after submission
          localStorage.removeItem('pendingSurvey');
        }
      }

      // Redirect to dashboard after login
      if (isAdmin) {
        navigate('/admin-dashboard'); // Admin dashboard
      } else {
        navigate('/user-dashboard'); // Regular user dashboard
      }
    } catch (error) {
      console.error('Error submitting survey after login:', error);
    }
  };

  return (
    <div>
      {step === 'login' ? (
        <Login onOtpSent={handleOtpSent} />
      ) : (
        <OTPVerify mobileNumber={mobileNumber} onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
