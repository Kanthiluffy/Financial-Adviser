import React from 'react';
import { Box, Container, CssBaseline, TextField, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AssetsLiabilitiesSection({ formData, setFormData }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNext = () => {
    navigate('/income-expenses');
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
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center',
            color: '#EAEAEA',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: '#08D9D6' }}>
            Assets and Liabilities
          </Typography>

          <FormControlLabel
            control={<Checkbox checked={formData.ownPrimaryHome} onChange={handleChange} />}
            label="Do you own your primary home?"
            name="ownPrimaryHome"
          />

          {formData.ownPrimaryHome && (
            <>
              <TextField
                label="What is the loan amount on your primary home?"
                name="loanAmountPrimaryHome"
                variant="outlined"
                fullWidth
                value={formData.loanAmountPrimaryHome || ''}
                onChange={handleChange}
                sx={{ marginBottom: '20px' }}
              />

              <TextField
                label="What is the current value of your home?"
                name="currentHomeValue"
                variant="outlined"
                fullWidth
                value={formData.currentHomeValue || ''}
                onChange={handleChange}
                sx={{ marginBottom: '20px' }}
              />
            </>
          )}

          <Button
            variant="contained"
            onClick={handleNext}
            fullWidth
            sx={{
              bgcolor: '#08D9D6',
              color: '#252A34',
              '&:hover': {
                bgcolor: '#07C0BD',
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
