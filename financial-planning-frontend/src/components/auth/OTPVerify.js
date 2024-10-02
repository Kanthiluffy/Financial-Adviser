import React, { useState } from 'react';
import { Box, Container, CssBaseline, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

export default function OTPVerify({ mobileNumber, onLoginSuccess }) {
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerify = async () => {
    try {
      // Reset error message before making the request
      setErrorMessage('');

      console.log('Verifying OTP for mobile number:', mobileNumber);

      // Make an API call to verify OTP
      const response = await axios.post('http://localhost:5000/api/auth/verify', {
        mobileNumber,
        otp,
      });

      // Log the response for debugging
      console.log('API Response:', response.status, response.data);

      if (response.status === 200) {
        const { token, isAdmin } = response.data;
        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Move to the dashboard or appropriate page
        onLoginSuccess(isAdmin);
      } else {
        setErrorMessage('Unexpected response. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setErrorMessage(error.response?.data?.message || 'Invalid OTP. Please try again.');
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: '#EAEAEA',
        }}
      >
        <Box
          sx={{
            bgcolor: '#252A34',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: 3,
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            color: '#EAEAEA',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: '#08D9D6' }}>
            Verify OTP
          </Typography>
          <TextField
            label="Enter OTP"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{
              marginBottom: '20px',
              bgcolor: '#EAEAEA',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#08D9D6',
                },
                '&:hover fieldset': {
                  borderColor: '#08D9D6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#08D9D6',
                },
              },
            }}
          />
          {errorMessage && (
            <Typography color="#FF2E63" variant="body2" sx={{ marginBottom: '15px' }}>
              {errorMessage}
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={handleVerify}
            fullWidth
            sx={{
              bgcolor: '#08D9D6',
              color: '#252A34',
              '&:hover': {
                bgcolor: '#07C0BD',
              },
            }}
          >
            Verify OTP
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
