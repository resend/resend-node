# Klotty Node.js SDK

Node.js library for the Klotty API.

## Install

```bash
npm install klotty
# or
yarn add klotty
```

## Setup

First, you need to get an API key, which is available in the [Klotty Dashboard](https://klotty.com).

```js
import Klotty from 'klotty';
const klotty = new Klotty('kl_123');
```

## Usage

Send your first email:

```js
await klotty.sendEmail({
  from: "you@example.com",
  to: "user@gmail.com",
  subject: "hello world"
});
```

## License

MIT License