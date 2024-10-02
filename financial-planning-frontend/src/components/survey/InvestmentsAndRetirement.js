import React from 'react';
import { Box, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';

const InvestmentsAndRetirement = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Box>
      <Typography variant="h5">Investments and Retirement</Typography>

      <TextField
        label="What are your current taxable assets (e.g., stocks, CDs, mutual funds, ETFs, crypto)?"
        name="taxableAssets"
        fullWidth
        value={data.taxableAssets}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="What is your current emergency savings balance?"
        name="emergencySavings"
        fullWidth
        value={data.emergencySavings}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />

      <Typography>Do you have any retirement accounts?</Typography>
      <FormControlLabel
        control={<Checkbox name="hasRetirementAccounts" checked={data.hasRetirementAccounts} onChange={handleInputChange} />}
        label="Yes"
      />
      {data.hasRetirementAccounts && (
        <>
          <Typography>Please specify your retirement accounts:</Typography>
          <FormControlLabel
            control={<Checkbox name="previousEmployer401k" checked={data.previousEmployer401k} onChange={handleInputChange} />}
            label="Previous employer 401(k), IRA, SEP IRA (Pre-tax)"
          />
          <FormControlLabel
            control={<Checkbox name="currentEmployer401k" checked={data.currentEmployer401k} onChange={handleInputChange} />}
            label="Current employer 401(k)"
          />
          <FormControlLabel
            control={<Checkbox name="rothAccounts" checked={data.rothAccounts} onChange={handleInputChange} />}
            label="Roth 401(k), Roth IRA (Post-tax)"
          />

          <TextField
            label="Annual contributions and matching (if applicable)"
            name="retirementContributions"
            fullWidth
            value={data.retirementContributions}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </>
      )}

      <TextField
        label="What is your Health Savings Account (HSA) balance?"
        name="hsaBalance"
        fullWidth
        value={data.hsaBalance}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="What is your annual contribution to your Health Savings Account (HSA)?"
        name="hsaContribution"
        fullWidth
        value={data.hsaContribution}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="What is the cash surrender value of your life insurance policies (if any)?"
        name="lifeInsuranceCashValue"
        fullWidth
        value={data.lifeInsuranceCashValue}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default InvestmentsAndRetirement;
