import React, { useState } from 'react';
import Login from './Login';  // Assuming Login is already created
import OTPVerify from './OTPVerify';  // Assuming OTPVerify is already created
import { useNavigate } from 'react-router-dom'; // Updated import

export default function LoginFlow() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [step, setStep] = useState('login');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // When OTP is sent, switch to OTP verification step
  const handleOtpSent = (mobile) => {
    setMobileNumber(mobile);
    setStep('verify');
  };

  // On successful login, redirect to dashboard based on admin status
  const handleLoginSuccess = (isAdmin) => {
    if (isAdmin) {
      navigate('/user-dashboard'); // Use navigate to redirect
    } else {
      navigate('/user-dashboard'); // Use navigate to redirect
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
