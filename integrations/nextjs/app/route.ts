import { Resend } from '../../../';

export function GET() {
  new Resend(process.env.RESEND_API_KEY);

  return new Response('Hello from this API route!', { status: 200 });
}
