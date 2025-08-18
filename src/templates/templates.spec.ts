import { enableFetchMocks } from 'jest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import type {
  CreateTemplateOptions,
  CreateTemplateResponseSuccess,
} from './interfaces/create-template-options.interface';

enableFetchMocks();

describe('Templates', () => {
  afterEach(() => fetchMock.resetMocks());

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
        html: '<h1>Welcome to our platform!</h1>',
        text: 'Welcome to our platform!',
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

    it('creates a template with some optional fields', async () => {
      const payload: CreateTemplateOptions = {
        name: 'Password Reset',
        subject: 'Reset your password',
        html: '<h1>Reset your password</h1><p>Click the link below to reset your password.</p>',
        alias: 'password-reset',
        from: 'security@example.com',
      };
      const response: CreateTemplateResponseSuccess = {
        object: 'template',
        id: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
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
    "id": "ac7503ac-e027-4aea-94b3-b0acd46f65f9",
    "object": "template",
  },
  "error": null,
}
`);
    });

    it('throws error when missing required name field', async () => {
      const payload: CreateTemplateOptions = {
        name: '',
        html: '<h1>Welcome!</h1>',
      };
      const response: ErrorResponse = {
        name: 'missing_required_field',
        message: 'Missing `name` field',
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
    "message": "Missing \`name\` field",
    "name": "missing_required_field",
  },
}
`);
    });

    it('throws error when missing required html field', async () => {
      const payload: CreateTemplateOptions = {
        name: 'Welcome Email',
        html: '',
      };
      const response: ErrorResponse = {
        name: 'missing_required_field',
        message: 'Missing `html` field',
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
    "message": "Missing \`html\` field",
    "name": "missing_required_field",
  },
}
`);
    });

    it('throws error when invalid email format in from field', async () => {
      const payload: CreateTemplateOptions = {
        name: 'Welcome Email',
        html: '<h1>Welcome!</h1>',
        from: 'invalid-email',
      };
      const response: ErrorResponse = {
        name: 'invalid_parameter',
        message: 'Invalid email format in `from` field.',
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
    "message": "Invalid email format in \`from\` field.",
    "name": "invalid_parameter",
  },
}
`);
    });

    it('throws error when invalid email format in reply_to field', async () => {
      const payload: CreateTemplateOptions = {
        name: 'Welcome Email',
        html: '<h1>Welcome!</h1>',
        reply_to: ['valid@example.com', 'invalid-email'],
      };
      const response: ErrorResponse = {
        name: 'invalid_parameter',
        message: 'Invalid email format in `reply_to` field.',
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
    "message": "Invalid email format in \`reply_to\` field.",
    "name": "invalid_parameter",
  },
}
`);
    });

    it('throws error when invalid variable type', async () => {
      const payload: CreateTemplateOptions = {
        name: 'Welcome Email',
        html: '<h1>Welcome!</h1>',
        variables: [
          {
            key: 'count',
            fallback_value: '0',
            type: 'invalid_type' as 'string' | 'number' | 'boolean',
          },
        ],
      };
      const response: ErrorResponse = {
        name: 'invalid_parameter',
        message:
          'Invalid variable type. Must be one of: string, number, boolean.',
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
    "message": "Invalid variable type. Must be one of: string, number, boolean.",
    "name": "invalid_parameter",
  },
}
`);
    });

    it('throws error when variable key contains invalid characters', async () => {
      const payload: CreateTemplateOptions = {
        name: 'Welcome Email',
        html: '<h1>Welcome!</h1>',
        variables: [
          {
            key: 'user-name', // Contains hyphen which is invalid
            type: 'string',
            fallback_value: 'Guest',
          },
        ],
      };
      const response: ErrorResponse = {
        name: 'validation_error',
        message:
          'The `variables, key` field must only contain alphanumeric characters and underscores.',
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
    "message": "The \`variables, key\` field must only contain alphanumeric characters and underscores.",
    "name": "validation_error",
  },
}
`);
    });

    it('throws error when variable is used in template but not defined', async () => {
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

    it('throws error when name exceeds max length', async () => {
      const payload: CreateTemplateOptions = {
        name: 'A'.repeat(51), // Exceeds maxLength: 50
        html: '<h1>Welcome!</h1>',
      };
      const response: ErrorResponse = {
        name: 'validation_error',
        message: 'The `name` field must not exceed 50 characters.',
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
    "message": "The \`name\` field must not exceed 50 characters.",
    "name": "validation_error",
  },
}
`);
    });

    it('throws error when alias exceeds max length', async () => {
      const payload: CreateTemplateOptions = {
        name: 'Welcome Email',
        html: '<h1>Welcome!</h1>',
        alias: 'A'.repeat(51), // Exceeds maxLength: 50
      };
      const response: ErrorResponse = {
        name: 'validation_error',
        message: 'The `alias` field must not exceed 50 characters.',
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
    "message": "The \`alias\` field must not exceed 50 characters.",
    "name": "validation_error",
  },
}
`);
    });

    it('throws error when too many variables are provided', async () => {
      const payload: CreateTemplateOptions = {
        name: 'Welcome Email',
        html: '<h1>Welcome!</h1>',
        variables: Array.from({ length: 21 }, (_, i) => ({
          // Exceeds maxItems: 20
          key: `var_${i}`,
          type: 'string' as const,
          fallback_value: 'default',
        })),
      };
      const response: ErrorResponse = {
        name: 'validation_error',
        message: 'The `variables` field must not exceed 20 items.',
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
    "message": "The \`variables\` field must not exceed 20 items.",
    "name": "validation_error",
  },
}
`);
    });

    it('throws error when too many reply_to addresses are provided', async () => {
      const payload: CreateTemplateOptions = {
        name: 'Welcome Email',
        html: '<h1>Welcome!</h1>',
        reply_to: Array.from({ length: 51 }, (_, i) => `email${i}@example.com`), // Exceeds maxItems: 50
      };
      const response: ErrorResponse = {
        name: 'validation_error',
        message: 'The `reply_to` field must not exceed 50 items.',
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
    "message": "The \`reply_to\` field must not exceed 50 items.",
    "name": "validation_error",
  },
}
`);
    });

    it('creates template with reply_to as array', async () => {
      const payload: CreateTemplateOptions = {
        name: 'Welcome Email',
        html: '<h1>Welcome!</h1>',
        reply_to: ['support@example.com', 'noreply@example.com'],
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
  });
});
