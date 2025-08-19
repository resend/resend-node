import { enableFetchMocks } from 'jest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import type {
  CreateTemplateOptions,
  CreateTemplateResponseSuccess,
} from './interfaces/create-template-options.interface';

enableFetchMocks();

const mockRenderAsync = jest.fn();
jest.mock('@react-email/render', () => ({
  renderAsync: mockRenderAsync,
}));

describe('Templates', () => {
  afterEach(() => {
    jest.resetAllMocks();
    fetchMock.resetMocks();
  });

  describe('create', () => {
    it('creates a template with minimal required fields', async () => {
      const payload: CreateTemplateOptions = {
        name: 'Welcome Email',
        html: '<h1>Welcome to our platform!</h1>',
      };
      const response: CreateTemplateResponseSuccess = {
        object: 'template',
        id: '3deaccfb-f47f-440a-8875-ea14b1716b43',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.templates.create(payload),
      ).resolves.toMatchInlineSnapshot(`
    {
      "data": {
        "id": "3deaccfb-f47f-440a-8875-ea14b1716b43",
        "object": "template",
      },
      "error": null,
    }
    `);
    });

    it('creates a template with all optional fields', async () => {
      const payload: CreateTemplateOptions = {
        name: 'Welcome Email',
        subject: 'Welcome to our platform',
        html: '<h1>Welcome to our platform, {{{name}}}!</h1><p>We are excited to have you join {{{company}}}.</p>',
        text: 'Welcome to our platform, {{{name}}}! We are excited to have you join {{{company}}}.',
        variables: [
          {
            key: 'name',
            fallback_value: 'User',
            type: 'string',
          },
          {
            key: 'company',
            fallback_value: 'Company',
            type: 'string',
          },
        ],
        alias: 'welcome-email',
        from: 'noreply@example.com',
        reply_to: ['support@example.com', 'help@example.com'],
      };
      const response: CreateTemplateResponseSuccess = {
        object: 'template',
        id: 'fd61172c-cafc-40f5-b049-b45947779a29',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.templates.create(payload),
      ).resolves.toMatchInlineSnapshot(`
    {
      "data": {
        "id": "fd61172c-cafc-40f5-b049-b45947779a29",
        "object": "template",
      },
      "error": null,
    }
    `);
    });

    it('throws error when template validation fails', async () => {
      const payload: CreateTemplateOptions = {
        name: 'Welcome Email',
        html: '<h1>Welcome {{{user_email}}}!</h1>', // Uses undefined variable
        variables: [
          {
            key: 'user_name',
            type: 'string',
            fallback_value: 'Guest',
          },
        ],
      };
      const response: ErrorResponse = {
        name: 'validation_error',
        message:
          "Variable 'user_email' is used in the template but not defined in the variables list",
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 422,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.templates.create(payload);

      await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Variable 'user_email' is used in the template but not defined in the variables list",
    "name": "validation_error",
  },
}
`);
    });

    it('creates template with React component', async () => {
      const mockReactComponent = {
        type: 'div',
        props: { children: 'Welcome!' },
      } as React.ReactElement;

      mockRenderAsync.mockResolvedValueOnce('<div>Welcome!</div>');

      const payload: CreateTemplateOptions = {
        name: 'Welcome Email',
        react: mockReactComponent,
      };

      const response: CreateTemplateResponseSuccess = {
        object: 'template',
        id: '3deaccfb-f47f-440a-8875-ea14b1716b43',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.templates.create(payload),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "id": "3deaccfb-f47f-440a-8875-ea14b1716b43",
    "object": "template",
  },
  "error": null,
}
`);

      expect(mockRenderAsync).toHaveBeenCalledWith(mockReactComponent);
    });

    it('creates template with React component and all optional fields', async () => {
      const mockReactComponent = {
        type: 'div',
        props: {
          children: [
            { type: 'h1', props: { children: 'Welcome {name}!' } },
            { type: 'p', props: { children: 'Welcome to {company}.' } },
          ],
        },
      } as React.ReactElement;

      mockRenderAsync.mockResolvedValueOnce(
        '<div><h1>Welcome {{{name}}}!</h1><p>Welcome to {{{company}}}.</p></div>',
      );

      const payload: CreateTemplateOptions = {
        name: 'Welcome Email',
        subject: 'Welcome to our platform',
        react: mockReactComponent,
        text: 'Welcome {{{name}}}! Welcome to {{{company}}}.',
        variables: [
          {
            key: 'name',
            fallback_value: 'User',
            type: 'string',
          },
          {
            key: 'company',
            fallback_value: 'Company',
            type: 'string',
          },
        ],
        alias: 'welcome-email',
        from: 'noreply@example.com',
        reply_to: ['support@example.com', 'help@example.com'],
      };

      const response: CreateTemplateResponseSuccess = {
        object: 'template',
        id: 'fd61172c-cafc-40f5-b049-b45947779a29',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.templates.create(payload),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "id": "fd61172c-cafc-40f5-b049-b45947779a29",
    "object": "template",
  },
  "error": null,
}
`);

      expect(mockRenderAsync).toHaveBeenCalledWith(mockReactComponent);
    });

    it('throws error when React renderer fails to load', async () => {
      const mockReactComponent = {
        type: 'div',
        props: { children: 'Welcome!' },
      } as React.ReactElement;

      // Temporarily clear the mock implementation to simulate module load failure
      mockRenderAsync.mockImplementationOnce(() => {
        throw new Error(
          'Failed to render React component. Make sure to install `@react-email/render`',
        );
      });

      const payload: CreateTemplateOptions = {
        name: 'Welcome Email',
        react: mockReactComponent,
      };

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.templates.create(payload)).rejects.toThrow(
        'Failed to render React component. Make sure to install `@react-email/render`',
      );
    });
  });
});
