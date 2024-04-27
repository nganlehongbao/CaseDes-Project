// const twilio = require('twilio');

// async function sendSMS(phone, otp) {
//   const accountSid = 'your-twilio-account-sid';
//   const authToken = 'your-twilio-auth-token';
//   const client = new twilio(accountSid, authToken);

//   try {
//     await client.messages.create({
//       body: `Your OTP for verification is: ${otp}`,
//       from: 'your-twilio-phone-number',
//       to: phone
//     });
//     console.log('SMS sent successfully');
//   } catch (error) {
//     console.error('Error sending SMS:', error);
//   }
// }

// module.exports = sendSMS;
