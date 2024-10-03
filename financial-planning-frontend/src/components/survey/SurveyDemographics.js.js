import React, { useState } from 'react';
import { Box, Container, CssBaseline, TextField, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function DemographicsSection({ formData, setFormData }) {
  const [hasSpouse, setHasSpouse] = useState(formData.maritalStatus === 'married');
  const [hasChildren, setHasChildren] = useState(formData.hasChildren);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNext = () => {
    navigate('/goals');
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
            Demographics Section
          </Typography>

          <TextField
            label="What is your age?"
            name="age"
            variant="outlined"
            fullWidth
            value={formData.age || ''}
            onChange={handleChange}
            sx={{ marginBottom: '20px' }}
          />

          <FormControlLabel
            control={<Checkbox checked={formData.maritalStatus === 'married'} onChange={(e) => setHasSpouse(e.target.checked)} />}
            label="I am in a relationship/married"
            name="maritalStatus"
          />
          
          {hasSpouse && (
            <TextField
              label="What is your spouse/partner's age?"
              name="spouseAge"
              variant="outlined"
              fullWidth
              value={formData.spouseAge || ''}
              onChange={handleChange}
              sx={{ marginBottom: '20px' }}
            />
          )}

          <FormControlLabel
            control={<Checkbox checked={hasChildren} onChange={(e) => setHasChildren(e.target.checked)} />}
            label="Do you have children?"
            name="hasChildren"
          />

          {hasChildren && (
            <TextField
              label="What are the ages of your children?"
              name="childrenAges"
              variant="outlined"
              fullWidth
              value={formData.childrenAges || ''}
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
