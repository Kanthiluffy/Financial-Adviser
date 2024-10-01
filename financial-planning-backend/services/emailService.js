const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Create a transporter using Gmail service or any SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lankipallikanthikiran@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send email report
const sendEmailReport = async (recipientEmail, subject, reportContent) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,  // Your email address
      to: recipientEmail,       // Recipient's email
      subject: subject,         // Subject of the email
      text: reportContent,      // Email body (plain text or HTML)
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to', recipientEmail);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmailReport;
