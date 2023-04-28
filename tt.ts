import { Resend } from './src/resend';

const resend = new Resend('re_MBLmzW8j_EUtibnAdtDKEzQaauXSftYGo');

resend.emails
  .get('9020517d-4560-4c13-a669-a2ba7212988a')
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
