const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendOTP = async (mobileNumber, otp) => {
  try {
    await client.messages.create({
      body: `Your verification code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobileNumber,
    });
    console.log('OTP sent');
  } catch (error) {
    console.error('Failed to send OTP', error);
    throw error;
  }
};

module.exports = sendOTP;
