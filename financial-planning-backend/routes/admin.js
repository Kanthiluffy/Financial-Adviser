const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');  // Ensure admin is authenticated
const Survey = require('../models/survey');
const User = require('../models/user');
const { Parser } = require('json2csv');
const sendEmailReport = require('../services/emailService');  // Import the email service
const router = express.Router();

// Middleware to ensure the user is an admin
const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();  // Proceed if user is admin
    } else {
      return res.status(403).json({ message: 'Access denied, admin only.' });
    }
  };
  

// Get all users
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Get all surveys
router.get('/surveys', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const surveys = await Survey.find().populate('user');
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching surveys', error });
  }
});

// Export survey data to CSV or PDF (example for CSV)
router.get('/export/surveys', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const surveys = await Survey.find().populate('user');
    // Convert to CSV format
    const csv = surveys.map(survey => ({
      user: survey.user.mobileNumber,
      age: survey.age,
      spouseAge: survey.spouseAge,
      retirementGoals: survey.retirementGoals,
      riskTolerance: survey.riskTolerance,
      retirementAge: survey.retirementAge,
    }));

    res.setHeader('Content-Type', 'text/csv');
    res.attachment('surveys.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting surveys', error });
  }
});

// Set a user as admin (only accessible by existing admins)
router.put('/set-admin/:userId', authMiddleware, adminMiddleware, async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.isAdmin = true;
      await user.save();
      
      res.status(200).json({ message: 'User has been granted admin privileges', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating admin status', error });
    }
  });
  



  router.get('/export/surveys/csv', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const surveys = await Survey.find().populate('user');
      const fields = ['user.mobileNumber', 'age', 'spouseAge', 'retirementGoals', 'riskTolerance', 'retirementAge'];
      const opts = { fields };
  
      const parser = new Parser(opts);
      const csv = parser.parse(surveys);
  
      res.setHeader('Content-Disposition', 'attachment;filename=surveys.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv);
    } catch (error) {
      res.status(500).json({ message: 'Error exporting CSV' });
    }
  });
  
  
  // Send email report to a specific user
  router.post('/send-report/:userId', authMiddleware, adminMiddleware, async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find the user's survey data to include in the report
      const survey = await Survey.findOne({ user: userId }).populate('user');
  
      if (!survey) {
        return res.status(404).json({ message: 'Survey not found for this user' });
      }
  
      // Generate the content of the report (can be more complex based on your needs)
      const reportContent = `
        Financial Report for ${survey.user.mobileNumber}:
        - Age: ${survey.age}
        - Spouse Age: ${survey.spouseAge || 'N/A'}
        - Retirement Goals: ${survey.retirementGoals}
        - Risk Tolerance: ${survey.riskTolerance}
        - Retirement Age: ${survey.retirementAge}
      `;
  
      // Send the email report
      await sendEmailReport(survey.user.email, 'Your Financial Report', reportContent);
  
      res.status(200).json({ message: 'Email report sent successfully!' });
    } catch (error) {
      console.error('Error sending report:', error);
      res.status(500).json({ message: 'Error sending report' });
    }
  });
  

  
module.exports = router;
