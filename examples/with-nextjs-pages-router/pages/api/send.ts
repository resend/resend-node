import React from 'react';
import type { NextApiRequest, NextApiResponse } from 'next';
import EmailTemplate from '../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await resend.sendEmail({
      from: process.env.EMAIL_FROM || '',
      to: process.env.EMAIL_TO || '',
      subject: "hello world",
      react: EmailTemplate({ firstName: "John", product: "Resend" }),
    });

    res.status(200).json(data);
  }
  catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}
