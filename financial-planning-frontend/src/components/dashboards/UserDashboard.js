import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Dashboard.css';  // You can define custom styles here


const UserDashboard = () => {
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      const token = localStorage.getItem('token');  // Retrieve the stored JWT token
      try {
        const response = await axios.get('http://localhost:5000/api/survey', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSurvey(response.data);
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    };

    fetchSurvey();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      {survey ? (
        <div>
          <p>Age: {survey.age}</p>
          <p>Retirement Goals: {survey.retirementGoals}</p>
          {/* Display more survey details here */}
        </div>
      ) : (
        <p>Loading survey data...</p>
      )}
    </div>
  );
};

export default UserDashboard;
