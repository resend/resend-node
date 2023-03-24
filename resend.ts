import { Resend } from './src/resend';

const resend = new Resend('re_e5sg6nDc_PF2QApVkNGDZXdavaYtMEHdv');

const p = async () => {
  try {
    await resend.sendEmail({
      from: 'Bu <bu@bkn.sh?',
      to: 'bounce@simulator.amazonses.com',
      html: '<h1>Hi</h1>',
      subject: 'Subject',
    });
  } catch (error) {
    console.log({ error });
  }
};

p();
