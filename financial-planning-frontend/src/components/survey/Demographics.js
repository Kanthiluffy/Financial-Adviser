import React from 'react';
import { Box, TextField, FormControlLabel, Checkbox, Typography } from '@mui/material';

const Demographics = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Box>
      <Typography variant="h5">Demographics</Typography>
      <TextField
        label="What is your age?"
        name="age"
        fullWidth
        value={data.age}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <Typography>What is your marital status?</Typography>
      <FormControlLabel
        control={<Checkbox name="maritalStatus" checked={data.maritalStatus === 'single'} onChange={() => onChange({ maritalStatus: 'single' })} />}
        label="Single"
      />
      <FormControlLabel
        control={<Checkbox name="maritalStatus" checked={data.maritalStatus === 'married'} onChange={() => onChange({ maritalStatus: 'married' })} />}
        label="In a relationship/married"
      />
      {data.maritalStatus === 'married' && (
        <TextField
          label="What is your spouse/partner's age?"
          name="spouseAge"
          fullWidth
          value={data.spouseAge}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
      )}
      <Typography>Do you have children?</Typography>
      <FormControlLabel
        control={<Checkbox name="hasChildren" checked={data.hasChildren} onChange={handleInputChange} />}
        label="Yes"
      />
      {data.hasChildren && (
        <>
          <TextField
            label="How many children do you have?"
            name="numberOfChildren"
            fullWidth
            value={data.numberOfChildren}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Please provide the ages of your children"
            name="childrenAges"
            fullWidth
            value={data.childrenAges}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </>
      )}
    </Box>
  );
};

export default Demographics;
