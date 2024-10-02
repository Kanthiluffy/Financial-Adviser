import React, { useEffect, useState } from 'react';
import { Box, Container, CssBaseline, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated import

export default function UserDashboard() {
  const [surveyCompleted, setSurveyCompleted] = useState(false); // State to check if the survey is completed
  const [surveyData, setSurveyData] = useState(null); // Holds the survey data if completed
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchSurveyStatus = async () => {
      const token = localStorage.getItem('token'); // Retrieve token
      try {
        // API call to check if the user has completed the survey
        const response = await axios.get('http://localhost:5000/api/survey/status', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Check if the survey is completed
        if (response.data.completed) {
          setSurveyCompleted(true);
          setSurveyData(response.data.survey); // Set the survey data
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching survey status:', error);
        setLoading(false);
      }
    };

    fetchSurveyStatus();
  }, []);

  // Handle new user starting the survey
  const handleStartSurvey = () => {
    navigate('/survey'); // Use navigate to redirect to the survey form page
  };

  if (loading) {
    return <Typography>Loading...</Typography>; // Loading state while fetching data
  }

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
            color: '#EAEAEA',
            textAlign: 'center',
          }}
        >
          {!surveyCompleted ? (
            // Show this if the survey is not completed
            <>
              <Typography variant="h4" gutterBottom sx={{ color: '#08D9D6' }}>
                Welcome to Your Dashboard
              </Typography>
              <Typography variant="body1" gutterBottom>
                You haven't completed the survey yet.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleStartSurvey}
                sx={{
                  bgcolor: '#08D9D6',
                  color: '#252A34',
                  '&:hover': {
                    bgcolor: '#07C0BD',
                  },
                }}
              >
                Start Survey
              </Button>
            </>
          ) : (
            // Show this if the survey is completed
            <>
              <Typography variant="h4" gutterBottom sx={{ color: '#08D9D6' }}>
                Your Survey Data
              </Typography>
              <Typography variant="body1" gutterBottom>
                Age: {surveyData.age}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Retirement Goals: {surveyData.retirementGoals}
              </Typography>
              {/* Add more survey data fields here */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleStartSurvey}
                sx={{
                  bgcolor: '#FF2E63', // Accent color for action buttons
                  color: '#EAEAEA',
                  '&:hover': {
                    bgcolor: '#D12752',
                  },
                }}
              >
                Edit Survey
              </Button>
            </>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
}
