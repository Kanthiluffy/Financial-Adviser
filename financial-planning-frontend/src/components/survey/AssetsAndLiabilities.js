import React from 'react';
import { Box, TextField, FormControlLabel, Checkbox, Typography } from '@mui/material';

const AssetsAndLiabilities = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Box>
      <Typography variant="h5">Assets and Liabilities</Typography>

      <Typography>Do you own your primary home?</Typography>
      <FormControlLabel
        control={<Checkbox name="ownPrimaryHome" checked={data.ownPrimaryHome} onChange={handleInputChange} />}
        label="Yes"
      />
      {data.ownPrimaryHome && (
        <>
          <TextField
            label="What is the loan amount on your primary home?"
            name="primaryHomeLoanAmount"
            fullWidth
            value={data.primaryHomeLoanAmount}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="What is the current value of your home?"
            name="primaryHomeValue"
            fullWidth
            value={data.primaryHomeValue}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="What is your monthly mortgage and interest payment?"
            name="primaryHomeMonthlyPayment"
            fullWidth
            value={data.primaryHomeMonthlyPayment}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </>
      )}

      <Typography>Do you own any other real estate properties?</Typography>
      <FormControlLabel
        control={<Checkbox name="ownOtherRealEstate" checked={data.ownOtherRealEstate} onChange={handleInputChange} />}
        label="Yes"
      />
      {data.ownOtherRealEstate && (
        <>
          <TextField
            label="What is the current value of your other real estate properties?"
            name="otherRealEstateValue"
            fullWidth
            value={data.otherRealEstateValue}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="What is the loan amount remaining on your other real estate properties?"
            name="otherRealEstateLoanAmount"
            fullWidth
            value={data.otherRealEstateLoanAmount}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="What is your monthly mortgage and interest payment?"
            name="otherRealEstateMonthlyPayment"
            fullWidth
            value={data.otherRealEstateMonthlyPayment}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </>
      )}

      <Typography>Do you have any student loans?</Typography>
      <FormControlLabel
        control={<Checkbox name="hasStudentLoans" checked={data.hasStudentLoans} onChange={handleInputChange} />}
        label="Yes"
      />
      {data.hasStudentLoans && (
        <TextField
          label="What is the remaining balance on your student loans?"
          name="studentLoanBalance"
          fullWidth
          value={data.studentLoanBalance}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
      )}

      <Typography>Do you have any other debts that need to be paid off?</Typography>
      <FormControlLabel
        control={<Checkbox name="hasOtherDebts" checked={data.hasOtherDebts} onChange={handleInputChange} />}
        label="Yes"
      />
      {data.hasOtherDebts && (
        <TextField
          label="Please specify the type and amount of your other debts."
          name="otherDebtsDetails"
          fullWidth
          value={data.otherDebtsDetails}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
      )}
    </Box>
  );
};

export default AssetsAndLiabilities;
