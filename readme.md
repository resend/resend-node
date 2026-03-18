
![nodejs-og](https://github.com/user-attachments/assets/7bc8f7c1-1877-4ddd-89f9-4f8d9bc32ed5)

<p align="center">
  <a href="https://resend.com/docs/send-with-nodejs">Quickstart Docs</a>
</p>

<p align="center">
  Framework guides
</p>
<p align="center">
  <a 
  - <a href="https://resend.com/docs/send-with-nextjs">Next.js</a> 
  - <a href="https://resend.com/docs/send-with-remix">Remix</a> 
  - <a href="https://resend.com/docs/send-with-nuxt">Nuxt</a> 
  - <a href="https://resend.com/docs/send-with-express">Express</a> 
  - <a href="https://resend.com/docs/send-with-redwoodjs">RedwoodJS</a> 
  - <a href="https://resend.com/docs/send-with-hono">Hono</a> 
  - <a href="https://resend.com/docs/send-with-bun">Bun</a> 
  - <a href="https://resend.com/docs/send-with-astro">Astro</a> 
</p>

# Resend Node.js SDK

Node.js library for the Resend API.

## Install

```bash
npm install resend
# or
yarn add resend
```

## Examples

Send email with:

- [Node.js](https://github.com/resend/resend-node-example)
- [Next.js (App Router)](https://github.com/resend/resend-nextjs-app-router-example)
- [Next.js (Pages Router)](https://github.com/resend/resend-nextjs-pages-router-example)
- [Express](https://github.com/resend/resend-express-example)

## Setup

First, you need to get an API key, which is available in the [Resend Dashboard](https://resend.com/api-keys).

```js
import { Resend } from 'resend';
const resend = new Resend('re_xxxx...xxxxxx');
```

## Usage

Send your first email:

```js
const { data } = await resend.emails.send({
  from: 'you@example.com',
  to: 'user@gmail.com',
  replyTo: 'you@example.com',
  subject: 'hello world',
  text: 'it works!',
});

console.log(`Email ${data.id} has been sent`);
```

> [!NOTE]  
> In order to send from your own domain, you will first need to verify your domain in the [Resend Dashboard](https://resend.com/domains). 

## Send email using HTML

Send an email custom HTML content:

```js
const { data } = await resend.emails.send({
  from: 'you@example.com',
  to: 'user@gmail.com',
  replyTo: 'you@example.com',
  subject: 'hello world',
  html: '<strong>it works!</strong>',
});

console.log(`Emaill ${data.id} with customer HTML content has been sent.`);
```

## Send email using React

Start by creating your email template as a React component.

```jsx
import React from 'react';

export default function EmailTemplate({ firstName, product }) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <p>Thanks for trying {product}. We’re thrilled to have you on board.</p>
    </div>
  );
}
```

Then import the template component and pass it to the `react` property.

```jsx
import EmailTemplate from '../components/EmailTemplate';

const { data } = await resend.emails.send({
  from: 'you@example.com',
  to: 'user@gmail.com',
  replyTo: 'you@example.com',
  subject: 'hello world',
  react: <EmailTemplate firstName="John" product="MyApp" />,
});

console.log(`Email ${data.id} with a React template has been sent`);
```

> [!NOTE]
> If you're sending emails from a file that doesn't have JSX transpilation set up (e.g., in a `.js`/`.ts` file instead of JSX/TSX), use React's `jsx` runtime function instead of passing the component as JSX:
>
>```js
>import { jsx } from 'react/jsx-runtime'
>import EmailTemplate from '../components/EmailTemplate';
>
>await resend.emails.send({
>  from: 'you@example.com',
>  to: 'user@gmail.com',
>  replyTo: 'you@example.com',
>  subject: 'hello world',
>  react: jsx(EmailTemplate, { firstName:"John", product:"MyApp" }),
>});
>```

## License

MIT License
