import React from 'react';
import { Box, TextField, FormControlLabel, Checkbox, Typography } from '@mui/material';

const Goals = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Box>
      <Typography variant="h5">Goals</Typography>

      <Typography>Are you already retired?</Typography>
      <FormControlLabel
        control={<Checkbox name="isRetired" checked={data.isRetired} onChange={handleInputChange} />}
        label="Yes"
      />
      {!data.isRetired && (
        <TextField
          label="How many more years do you plan to work?"
          name="yearsToWork"
          fullWidth
          value={data.yearsToWork}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
      )}

      <Typography>Is your spouse/partner already retired?</Typography>
      <FormControlLabel
        control={<Checkbox name="isSpouseRetired" checked={data.isSpouseRetired} onChange={handleInputChange} />}
        label="Yes"
      />
      {!data.isSpouseRetired && (
        <TextField
          label="How many more years does your spouse/partner plan to work?"
          name="spouseYearsToWork"
          fullWidth
          value={data.spouseYearsToWork}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
      )}

      <Typography>Are you planning to save for your children's college education?</Typography>
      <FormControlLabel
        control={<Checkbox name="isSavingForCollege" checked={data.isSavingForCollege} onChange={handleInputChange} />}
        label="Yes"
      />
      {data.isSavingForCollege && (
        <TextField
          label="What percentage of the tuition are you planning to cover?"
          name="tuitionCoveragePercentage"
          fullWidth
          value={data.tuitionCoveragePercentage}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
      )}
    </Box>
  );
};

export default Goals;
