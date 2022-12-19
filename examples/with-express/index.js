require('dotenv').config()

const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const express = require('express');
const app = express();

app.get('/', async (req, res) => {
  try {
    const data = await resend.sendEmail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "hello world",
      text: "it works!",
    });

    res.status(200).json(data);
  }
  catch(e) {
    res.status(400).json(e);
  }
})

app.listen(3000, () => {
  if (!process.env.RESEND_API_KEY) return throwError('RESEND_API_KEY');
  if (!process.env.EMAIL_FROM) return throwError('EMAIL_FROM');
  if (!process.env.EMAIL_TO) return throwError('EMAIL_TO');

  console.log('Listening on http://localhost:3000')
})

function throwError(envVar) {
  throw `Abort: You need to define ${envVar} in the .env file.`;
}