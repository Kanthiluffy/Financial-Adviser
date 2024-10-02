import React, { useState } from 'react';
import { Box, Container, CssBaseline, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

export default function Login({ onOtpSent }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      // Reset error message before making the request
      setErrorMessage('');

      // Log the mobile number being sent for debugging
      console.log('Sending OTP for mobile number:', mobileNumber);

      // Make an API call to send OTP
      const response = await axios.post('http://localhost:5000/api/auth/login', { mobileNumber });

      // Log the response status and data for debugging
      console.log('API Response:', response.status, response.data);

      // If the OTP is successfully sent (status 200 or similar success status)
      if (response.status === 200) {
        console.log('OTP sent successfully, moving to OTP verification.');
        onOtpSent(mobileNumber);  // Move to OTP verification step
      } else {
        // Handle unexpected status
        setErrorMessage('Unexpected response. Please try again.');
      }
    } catch (error) {
      // Handle errors returned by the server (network errors, invalid responses, etc.)
      console.error('Error during OTP request:', error);
      setErrorMessage(error.response?.data?.message || 'Error sending OTP. Please try again.');
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
          bgcolor: '#EAEAEA',  // Light background color
        }}
      >
        <Box
          sx={{
            bgcolor: '#252A34',  // Dark Gray background for the box
            padding: '30px',
            borderRadius: '12px',
            boxShadow: 3,
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            color: '#EAEAEA',  // Text color (light gray)
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: '#08D9D6' }}>
            Sign In
          </Typography>
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            sx={{
              marginBottom: '20px',
              bgcolor: '#EAEAEA',  // Background for input (light gray)
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#08D9D6',  // Primary color for input border
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
            onClick={handleLogin}
            fullWidth
            sx={{
              bgcolor: '#08D9D6',  // Primary button color
              color: '#252A34',     // Dark text color on button
              '&:hover': {
                bgcolor: '#07C0BD',  // Slightly darker primary color on hover
              },
            }}
          >
            Send OTP
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
