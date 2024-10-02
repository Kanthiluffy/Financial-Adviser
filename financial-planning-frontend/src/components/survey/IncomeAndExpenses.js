import React from 'react';
import { Box, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';

const IncomeAndExpenses = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Box>
      <Typography variant="h5">Income and Expenses</Typography>

      <TextField
        label="What is your current monthly income?"
        name="monthlyIncome"
        fullWidth
        value={data.monthlyIncome}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Spouse's monthly income (if applicable)"
        name="spouseMonthlyIncome"
        fullWidth
        value={data.spouseMonthlyIncome}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="What are your current monthly expenses (excluding mortgage payments)?"
        name="monthlyExpenses"
        fullWidth
        value={data.monthlyExpenses}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />

      <Typography>Do you have any temporary expenses that will be paid off within a certain number of years?</Typography>
      <FormControlLabel
        control={<Checkbox name="hasTemporaryExpenses" checked={data.hasTemporaryExpenses} onChange={handleInputChange} />}
        label="Yes"
      />
      {data.hasTemporaryExpenses && (
        <TextField
          label="Please specify the temporary expenses and the number of years they will last"
          name="temporaryExpensesDetails"
          fullWidth
          value={data.temporaryExpensesDetails}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
      )}

      <TextField
        label="What are your average annual travel expenses?"
        name="annualTravelExpenses"
        fullWidth
        value={data.annualTravelExpenses}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="What is your current life insurance premium?"
        name="lifeInsurancePremium"
        fullWidth
        value={data.lifeInsurancePremium}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default IncomeAndExpenses;
