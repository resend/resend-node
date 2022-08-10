import EmailTemplate from '../../components/EmailTemplate';
import { Klotty } from 'klotty';

const klotty = new Klotty(process.env.KLOTTY_API_KEY);

export default async function send(req, res) {
  try {
    const data = await klotty.sendEmail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "hello world",
      react: <EmailTemplate name="John" product="MyApp" />,
    });

    res.status(200).json(data);
  }
  catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
}
