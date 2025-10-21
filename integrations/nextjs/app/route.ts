import { Resend } from 'resend';

export function GET() {
  new Resend("");

  return new Response('Hello from this API route!', { status: 200 });
}
