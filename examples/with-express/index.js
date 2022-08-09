require('dotenv').config()

const { Klotty } = require('klotty');
const express = require('express');
const app = express();

app.get('/', async (req, res) => {
  try {
    const klotty = new Klotty(process.env.KLOTTY_API_KEY);
    const { data } = await klotty.sendEmail({
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
  if (!process.env.KLOTTY_API_KEY) return throwError('KLOTTY_API_KEY');
  if (!process.env.EMAIL_FROM) return throwError('EMAIL_FROM');
  if (!process.env.EMAIL_TO) return throwError('EMAIL_TO');

  console.log('Listening on http://localhost:3000')
})

function throwError(envVar) {
  throw `Abort: You need to define ${envVar} in the .env file.`;
}