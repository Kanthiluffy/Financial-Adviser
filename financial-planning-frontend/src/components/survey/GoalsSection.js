import React from 'react';
import { Box, Container, CssBaseline, TextField, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function GoalsSection({ formData, setFormData }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNext = () => {
    navigate('/assets-liabilities');
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
            Goals Section
          </Typography>

          <FormControlLabel
            control={<Checkbox checked={formData.isRetired} onChange={handleChange} />}
            label="Are you already retired?"
            name="isRetired"
          />

          {!formData.isRetired && (
            <TextField
              label="How many more years do you plan to work?"
              name="yearsUntilRetirement"
              variant="outlined"
              fullWidth
              value={formData.yearsUntilRetirement || ''}
              onChange={handleChange}
              sx={{ marginBottom: '20px' }}
            />
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
