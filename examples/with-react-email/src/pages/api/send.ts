import type { NextApiRequest, NextApiResponse } from 'next';
import { WaitlistEmail } from '../../../transactional/emails/waitlist';
import { resend } from '../../lib/resend';

const send = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['delivered@resend.dev'],
        subject: 'Waitlist',
        react: WaitlistEmail({ name: 'Bu' }),
      });

      if (error) {
        return res.status(500).send({ error });
      }

      return res.status(200).send({ data: data.id });
    }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default send;
