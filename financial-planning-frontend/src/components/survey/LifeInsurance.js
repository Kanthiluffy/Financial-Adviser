import React from 'react';
import { Box, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';

const LifeInsurance = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Box>
      <Typography variant="h5">Life Insurance</Typography>

      <Typography>Do you have term life insurance coverage?</Typography>
      <FormControlLabel
        control={<Checkbox name="hasTermLifeInsurance" checked={data.hasTermLifeInsurance} onChange={handleInputChange} />}
        label="Yes"
      />
      {data.hasTermLifeInsurance && (
        <>
          <TextField
            label="What is the face amount of your term life insurance?"
            name="termLifeFaceAmount"
            fullWidth
            value={data.termLifeFaceAmount}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="What is the coverage period of your term life insurance?"
            name="termLifeCoveragePeriod"
            fullWidth
            value={data.termLifeCoveragePeriod}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </>
      )}

      <Typography>Does your term life insurance include living benefits?</Typography>
      <FormControlLabel
        control={<Checkbox name="termLifeLivingBenefits" checked={data.termLifeLivingBenefits} onChange={handleInputChange} />}
        label="Yes"
      />

      <Typography>Do you have cash value life insurance (e.g., whole life, universal life, variable life)?</Typography>
      <FormControlLabel
        control={<Checkbox name="hasCashValueLifeInsurance" checked={data.hasCashValueLifeInsurance} onChange={handleInputChange} />}
        label="Yes"
      />
      {data.hasCashValueLifeInsurance && (
        <TextField
          label="What is the coverage amount for each policy?"
          name="cashValueLifeCoverageAmount"
          fullWidth
          value={data.cashValueLifeCoverageAmount}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
      )}
    </Box>
  );
};

export default LifeInsurance;
