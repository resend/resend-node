import axios from 'axios';
import MockAdapater from 'axios-mock-adapter';
import { Resend } from '../resend';
import { CreateEmailOptions, GetEmailResponse } from './interfaces';

const mock = new MockAdapater(axios);

describe('Emails', () => {
  beforeEach(() => {
    mock.resetHistory();
  });

  describe('create', () => {
    it('sends email', async () => {
      const payload: CreateEmailOptions = {
        from: 'bu@resend.com',
        to: 'zeno@resend.com',
        subject: 'Hello World',
        html: '<h1>Hello world</h1>',
      };
      mock.onPost('/emails', payload).replyOnce(200, {
        id: '1234',
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const data = await resend.emails.create(payload);
      expect(data).toMatchInlineSnapshot(`
        {
          "id": "1234",
        }
      `);
    });
  });

  describe('send', () => {
    it('sends email', async () => {
      const payload: CreateEmailOptions = {
        from: 'bu@resend.com',
        to: 'zeno@resend.com',
        subject: 'Hello World',
        html: '<h1>Hello world</h1>',
      };
      mock.onPost('/emails', payload).replyOnce(200, {
        id: '1234',
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const data = await resend.emails.send(payload);
      expect(data).toMatchInlineSnapshot(`
        {
          "id": "1234",
        }
      `);
    });
  });

  describe('get', () => {
    describe('when email not found', () => {
      it('returns error', async () => {
        mock.onGet('/emails/1234').replyOnce(404, {
          name: 'not_found',
          message: 'Email not found',
          statusCode: 404,
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(resend.emails.get('1234')).rejects.toMatchInlineSnapshot(`
          {
            "message": "Email not found",
            "name": "not_found",
            "statusCode": 404,
          }
        `);
      });
    });

    describe('when email found', () => {
      it('returns emails with only to', async () => {
        const response: GetEmailResponse = {
          object: 'email',
          id: '123',
          to: ['zeno@resend.com'],
          from: 'bu@resend.com',
          created_at: '321',
          subject: 'Test email',
          html: '<p>hello hello</p>',
          text: null,
          bcc: null,
          cc: null,
          reply_to: null,
          last_event: 'sent',
        };

        mock.onGet('/emails/1234').replyOnce(200, response);

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(resend.emails.get('1234')).resolves.toMatchInlineSnapshot(`
          {
            "bcc": null,
            "cc": null,
            "created_at": "321",
            "from": "bu@resend.com",
            "html": "<p>hello hello</p>",
            "id": "123",
            "last_event": "sent",
            "object": "email",
            "reply_to": null,
            "subject": "Test email",
            "text": null,
            "to": [
              "zeno@resend.com",
            ],
          }
        `);
      });

      it('returns emails with to and multiple cc', async () => {
        const response: GetEmailResponse = {
          object: 'email',
          id: '123',
          to: ['zeno@resend.com'],
          from: 'bu@resend.com',
          created_at: '321',
          subject: 'Test email',
          html: '<p>hello hello</p>',
          text: null,
          bcc: null,
          cc: ['zeno@resend.com', 'bu@resend.com'],
          reply_to: null,
          last_event: 'sent',
        };

        mock.onGet('/emails/1234').replyOnce(200, response);

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(resend.emails.get('1234')).resolves.toMatchInlineSnapshot(`
          {
            "bcc": null,
            "cc": [
              "zeno@resend.com",
              "bu@resend.com",
            ],
            "created_at": "321",
            "from": "bu@resend.com",
            "html": "<p>hello hello</p>",
            "id": "123",
            "last_event": "sent",
            "object": "email",
            "reply_to": null,
            "subject": "Test email",
            "text": null,
            "to": [
              "zeno@resend.com",
            ],
          }
        `);
      });
    });
  });
});
