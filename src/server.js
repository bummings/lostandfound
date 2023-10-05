const express = require('express');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.get('/sanity', (req, res) => {
  res.send('We are up + runnin');
});

app.post('/sendEmail', async (req, res) => {
  const { email, message } = req.body;

  const msg = {
    to: email,
    from: 'eabummings@gmail.com', // Replace with your email
    subject: 'Your Time Capsule',
    text: message,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send('Email scheduled');
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

app.listen(process.env.PORT, () => {
  console.log(`🎾 Server up and running on port ${process.env.PORT}! 🎾`);
});
