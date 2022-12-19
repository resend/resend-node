function throwError(envVar) {
  throw `Abort: You need to define ${envVar} in the .env file.`
}

if (!process.env.RESEND_API_KEY) return throwError('RESEND_API_KEY');
if (!process.env.EMAIL_FROM) return throwError('EMAIL_FROM');
if (!process.env.EMAIL_TO) return throwError('EMAIL_TO');