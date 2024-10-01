import React, { useState } from 'react';
import Login from './Login';
import OTPVerify from './OTPVerify';
import { useNavigate } from 'react-router-dom';

const LoginFlow = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [step, setStep] = useState('login');
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  // Handle OTP sent - move to the OTP verification step
  const handleOtpSent = (mobile) => {
    setMobileNumber(mobile);
    setStep('verify');
  };

  // Handle successful login - redirect based on admin status
  const handleLoginSuccess = (isAdmin) => {
    if (isAdmin) {
      navigate('/admin-dashboard');  // Navigate to the admin dashboard
    } else {
      navigate('/user-dashboard');   // Navigate to the user dashboard
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
};

export default LoginFlow;
