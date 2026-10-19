import { createServer } from 'node:http';
import { createElement } from 'react';
import { Resend } from './resend';

type EmailBody = { html?: string; text?: string };

describe('React content over HTTP', () => {
  const requests: {
    path: string;
    body: EmailBody | EmailBody[];
    traceId: string | string[] | undefined;
  }[] = [];
  const server = createServer((request, response) => {
    let body = '';
    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      requests.push({
        path: request.url ?? '',
        body: JSON.parse(body),
        traceId: request.headers['x-trace-id'],
      });
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(
        JSON.stringify(
          request.url === '/emails/batch'
            ? { data: [{ id: 'email-id' }] }
            : { id: 'email-id' },
        ),
      );
    });
  });
  let resend: Resend;

  beforeAll(async () => {
    await new Promise<void>((resolve) =>
      server.listen(0, '127.0.0.1', resolve),
    );
    const address = server.address();
    if (!address || typeof address === 'string') {
      throw new Error('Expected a local HTTP server address');
    }
    resend = new Resend('re_test_key', {
      baseUrl: `http://127.0.0.1:${address.port}`,
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  });

  for (const method of ['email', 'batch', 'template'] as const) {
    describe(method, () => {
      it.each([
        { name: 'zero', content: { react: 0 }, expected: '0' },
        {
          name: 'zero without fallback HTML',
          content: { react: 0, html: undefined },
          expected: '0',
        },
        { name: 'bigint zero', content: { react: BigInt(0) }, expected: '0' },
        {
          name: 'an element',
          content: { react: createElement('p', null, 'Rendered content') },
          expected: 'Rendered content',
        },
        { name: 'null', content: { react: null }, expected: 'Fallback' },
        { name: 'false', content: { react: false }, expected: 'Fallback' },
        { name: 'empty', content: { react: '' }, expected: 'Fallback' },
        {
          name: 'undefined',
          content: { react: undefined },
          expected: 'Fallback',
        },
      ])('preserves $name React content', async ({ content, expected }) => {
        const payload = {
          from: 'sender@example.test',
          to: 'recipient@example.test',
          subject: 'React content',
          html: '<p>Fallback</p>',
          text: 'Plain text',
          ...content,
        };
        const originalPayload = { ...payload };
        const requestOptions = {
          headers: { 'X-Trace-Id': 'react-content-test' },
        };
        const result =
          method === 'template'
            ? await resend.templates.create(
                { name: 'React template', ...payload },
                requestOptions,
              )
            : method === 'batch'
              ? await resend.batch.send([payload], requestOptions)
              : await resend.emails.send(payload, requestOptions);

        expect(result.error).toBeNull();
        const request = requests[requests.length - 1];
        expect(request?.path).toBe(
          method === 'template'
            ? '/templates'
            : method === 'batch'
              ? '/emails/batch'
              : '/emails',
        );
        const body = Array.isArray(request?.body)
          ? request.body[0]
          : request?.body;
        expect(body?.html?.replace(/<[^>]*>/g, '')).toBe(expected);
        expect(body?.text).toBe('Plain text');
        expect(request?.traceId).toBe('react-content-test');
        expect(payload).toEqual(originalPayload);
      });
    });
  }
});
