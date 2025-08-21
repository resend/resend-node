import { enableFetchMocks } from 'jest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import type {
  CreateTemplateOptions,
  CreateTemplateResponseSuccess,
} from './interfaces/create-template-options.interface';
import type { GetTemplateResponseSuccess } from './interfaces/get-template.interface';

enableFetchMocks();

const mockRenderAsync = jest.fn();
jest.mock('@react-email/render', () => ({
  renderAsync: mockRenderAsync,
}));

const TEST_API_KEY = 're_test_api_key';

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
          Authorization: `Bearer ${TEST_API_KEY}`,
        },
      });

      const resend = new Resend(TEST_API_KEY);
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
          Authorization: `Bearer ${TEST_API_KEY}`,
        },
      });

      const resend = new Resend(TEST_API_KEY);
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
          Authorization: `Bearer ${TEST_API_KEY}`,
        },
      });

      const resend = new Resend(TEST_API_KEY);

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
          Authorization: `Bearer ${TEST_API_KEY}`,
        },
      });

      const resend = new Resend(TEST_API_KEY);
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
          Authorization: `Bearer ${TEST_API_KEY}`,
        },
      });

      const resend = new Resend(TEST_API_KEY);
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

      const resend = new Resend(TEST_API_KEY);

      await expect(resend.templates.create(payload)).rejects.toThrow(
        'Failed to render React component. Make sure to install `@react-email/render`',
      );
    });
  });

  describe('remove', () => {
    it('removes a template', async () => {
      const id = '5262504e-8ed7-4fac-bd16-0d4be94bc9f2';
      const response = {
        object: 'template',
        id,
        deleted: true,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${TEST_API_KEY}`,
        },
      });

      const resend = new Resend(TEST_API_KEY);

      await expect(resend.templates.remove(id)).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "deleted": true,
    "id": "5262504e-8ed7-4fac-bd16-0d4be94bc9f2",
    "object": "template",
  },
  "error": null,
}
`);
    });

    it('throws error when template not found', async () => {
      const id = '5262504e-8ed7-4fac-bd16-0d4be94bc9f2';
      const response: ErrorResponse = {
        name: 'not_found',
        message: 'Template not found',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 404,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${TEST_API_KEY}`,
        },
      });

      const resend = new Resend(TEST_API_KEY);

      await expect(resend.templates.remove(id)).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Template not found",
    "name": "not_found",
  },
}
`);
    });
  });

  describe('duplicate', () => {
    it('duplicates a template', async () => {
      const id = '5262504e-8ed7-4fac-bd16-0d4be94bc9f2';
      const response = {
        object: 'template',
        id: 'fd61172c-cafc-40f5-b049-b45947779a29',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${TEST_API_KEY}`,
        },
      });

      const resend = new Resend(TEST_API_KEY);

      await expect(
        resend.templates.duplicate(id),
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

    it('throws error when template not found', async () => {
      const id = '5262504e-8ed7-4fac-bd16-0d4be94bc9f2';
      const response: ErrorResponse = {
        name: 'not_found',
        message: 'Template not found',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 404,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${TEST_API_KEY}`,
        },
      });

      const resend = new Resend(TEST_API_KEY);

      await expect(
        resend.templates.duplicate(id),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Template not found",
    "name": "not_found",
  },
}
`);
    });
  });

  describe('get', () => {
    describe('when template not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Template not found',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${TEST_API_KEY}`,
          },
        });

        const resend = new Resend(TEST_API_KEY);

        await expect(
          resend.templates.get('non-existent-id'),
        ).resolves.toMatchInlineSnapshot(`
  {
    "data": null,
    "error": {
      "message": "Template not found",
      "name": "not_found",
    },
  }
  `);
      });
    });

    it('get template', async () => {
      const response: GetTemplateResponseSuccess = {
        object: 'template',
        id: 'fd61172c-cafc-40f5-b049-b45947779a29',
        name: 'Welcome Email',
        created_at: '2025-08-19 19:28:27.947052+00',
        updated_at: '2025-08-19 19:28:27.947052+00',
        html: '<h1>Welcome!</h1>',
        text: 'Welcome!',
        subject: 'Welcome to our platform',
        status: 'published',
        alias: 'welcome-email',
        from: 'noreply@example.com',
        reply_to: ['support@example.com'],
        published_at: '2025-08-19 19:28:27.947052+00',
        variables: [
          {
            key: 'name',
            type: 'string',
            fallback_value: 'User',
            created_at: '2025-08-19 19:28:27.947052+00',
            updated_at: '2025-08-19 19:28:27.947052+00',
          },
        ],
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${TEST_API_KEY}`,
        },
      });

      const resend = new Resend(TEST_API_KEY);

      await expect(
        resend.templates.get('fd61172c-cafc-40f5-b049-b45947779a29'),
      ).resolves.toMatchInlineSnapshot(`
  {
    "data": {
      "alias": "welcome-email",
      "created_at": "2025-08-19 19:28:27.947052+00",
      "from": "noreply@example.com",
      "html": "<h1>Welcome!</h1>",
      "id": "fd61172c-cafc-40f5-b049-b45947779a29",
      "name": "Welcome Email",
      "object": "template",
      "published_at": "2025-08-19 19:28:27.947052+00",
      "reply_to": [
        "support@example.com",
      ],
      "status": "published",
      "subject": "Welcome to our platform",
      "text": "Welcome!",
      "updated_at": "2025-08-19 19:28:27.947052+00",
      "variables": [
        {
          "created_at": "2025-08-19 19:28:27.947052+00",
          "fallback_value": "User",
          "key": "name",
          "type": "string",
          "updated_at": "2025-08-19 19:28:27.947052+00",
        },
      ],
    },
    "error": null,
  }
  `);
    });
  });

  describe('publish', () => {
    it('publishes a template', async () => {
      const id = '5262504e-8ed7-4fac-bd16-0d4be94bc9f2';
      const response = {
        object: 'template',
        id,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${TEST_API_KEY}`,
        },
      });

      const resend = new Resend(TEST_API_KEY);

      await expect(
        resend.templates.publish(id),
      ).resolves.toMatchInlineSnapshot(`
  {
    "data": {
      "id": "5262504e-8ed7-4fac-bd16-0d4be94bc9f2",
      "object": "template",
    },
    "error": null,
  }
  `);
    });

    it('throws error when template not found', async () => {
      const id = '5262504e-8ed7-4fac-bd16-0d4be94bc9f2';
      const response: ErrorResponse = {
        name: 'not_found',
        message: 'Template not found',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 404,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${TEST_API_KEY}`,
        },
      });

      const resend = new Resend(TEST_API_KEY);

      await expect(
        resend.templates.publish(id),
      ).resolves.toMatchInlineSnapshot(`
  {
    "data": null,
    "error": {
      "message": "Template not found",
      "name": "not_found",
    },
  }
  `);
    });

    describe('chaining with create', () => {
      it('chains create().publish() successfully', async () => {
        const createResponse = {
          object: 'template',
          id: 'fd61172c-cafc-40f5-b049-b45947779a29',
        };

        const publishResponse = {
          object: 'template',
          id: 'fd61172c-cafc-40f5-b049-b45947779a29',
        };

        // Mock create request
        fetchMock.mockOnceIf(
          (req) =>
            req.url.includes('/templates') && !req.url.includes('publish'),
          JSON.stringify(createResponse),
          {
            status: 200,
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${TEST_API_KEY}`,
            },
          },
        );

        // Mock publish request
        fetchMock.mockOnceIf(
          (req) =>
            req.url.includes('/templates') && req.url.includes('publish'),
          JSON.stringify(publishResponse),
          {
            status: 200,
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${TEST_API_KEY}`,
            },
          },
        );

        const resend = new Resend(TEST_API_KEY);

        await expect(
          resend.templates
            .create({
              name: 'Welcome Email',
              html: '<h1>Welcome!</h1>',
            })
            .publish(),
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

    describe('chaining with duplicate', () => {
      it('chains duplicate().publish() successfully', async () => {
        const duplicateResponse = {
          object: 'template',
          id: 'new-template-id-123',
        };

        const publishResponse = {
          object: 'template',
          id: 'new-template-id-123',
        };

        // Mock duplicate request
        fetchMock.mockOnceIf(
          (req) => req.url.includes('/duplicate'),
          JSON.stringify(duplicateResponse),
          {
            status: 200,
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${TEST_API_KEY}`,
            },
          },
        );

        // Mock publish request
        fetchMock.mockOnceIf(
          (req) => req.url.includes('/publish'),
          JSON.stringify(publishResponse),
          {
            status: 200,
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${TEST_API_KEY}`,
            },
          },
        );

        const resend = new Resend(TEST_API_KEY);

        await expect(
          resend.templates.duplicate('original-template-id').publish(),
        ).resolves.toMatchInlineSnapshot(`
  {
    "data": {
      "id": "new-template-id-123",
      "object": "template",
    },
    "error": null,
  }
  `);
      });
    });
  });
});
