import React from 'react';
import type { NextApiRequest, NextApiResponse } from 'next';
import EmailTemplate from '../../components/EmailTemplate';
import { Klotty } from 'klotty';

const klotty = new Klotty(process.env.KLOTTY_API_KEY);

export default async(req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await klotty.sendEmail({
      from: process.env.EMAIL_FROM || '',
      to: process.env.EMAIL_TO || '',
      subject: "hello world",
      react: <EmailTemplate firstName="John" product="MyApp" />,
    });

    res.status(200).json(data);
  }
  catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
}
