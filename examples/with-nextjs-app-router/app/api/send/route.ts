import { NextResponse } from 'next/server';
import EmailTemplate from '../../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const data = await resend.sendEmail({
      from: process.env.EMAIL_FROM || '',
      to: process.env.EMAIL_TO || '',
      subject: "hello world",
      react: EmailTemplate({ firstName: "John", product: "Resend" }),
    });

    return NextResponse.json(data);
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}