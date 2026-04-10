import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import { mockSuccessResponse } from '../test-utils/mock-fetch';
import type {
  CreateAutomationOptions,
  CreateAutomationResponseSuccess,
} from './interfaces/create-automation-options.interface';
import type { GetAutomationResponseSuccess } from './interfaces/get-automation.interface';
import type { ListAutomationsResponseSuccess } from './interfaces/list-automation.interface';
import type { RemoveAutomationResponseSuccess } from './interfaces/remove-automation.interface';
import type { StopAutomationResponseSuccess } from './interfaces/stop-automation.interface';
import type { UpdateAutomationResponseSuccess } from './interfaces/update-automation.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

afterEach(() => fetchMock.resetMocks());
afterAll(() => fetchMocker.disableMocks());

describe('create', () => {
  it('creates an automation', async () => {
    const response: CreateAutomationResponseSuccess = {
      object: 'automation',
      id: '71cdfe68-cf79-473a-a9d7-21f91db6a526',
    };

    fetchMock.mockOnce(JSON.stringify(response), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });

    const payload: CreateAutomationOptions = {
      name: 'Welcome Flow',
      status: 'enabled',
      steps: [
        {
          key: 'trigger',
          type: 'trigger',
          config: { eventName: 'user.created' },
        },
        {
          key: 'welcome_email',
          type: 'send_email',
          config: { templateId: 'tpl-123' },
        },
      ],
      connections: [{ from: 'trigger', to: 'welcome_email', type: 'default' }],
    };

    const data = await resend.automations.create(payload);
    expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "id": "71cdfe68-cf79-473a-a9d7-21f91db6a526",
            "object": "automation",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
  });

  it('throws an error when an ErrorResponse is returned', async () => {
    const response: ErrorResponse = {
      name: 'missing_required_field',
      statusCode: 422,
      message: 'Missing `name` field.',
    };

    fetchMock.mockOnce(JSON.stringify(response), {
      status: 422,
      headers: {
        'content-type': 'application/json',
      },
    });

    const data = await resend.automations.create({
      name: '',
      steps: [],
      connections: [],
    });
    expect(data).toMatchInlineSnapshot(`
        {
          "data": null,
          "error": {
            "message": "Missing \`name\` field.",
            "name": "missing_required_field",
            "statusCode": 422,
          },
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
  });
});

describe('list', () => {
  const response: ListAutomationsResponseSuccess = {
    object: 'list',
    has_more: false,
    data: [
      {
        id: '49a3999c-0ce1-4ea6-ab68-afcd6dc2e794',
        name: 'Welcome Flow',
        status: 'enabled',
        created_at: '2025-01-01T00:00:00.000Z',
        updated_at: '2025-01-01T00:00:00.000Z',
      },
      {
        id: '559ac32e-9ef5-46fb-82a1-b76b840c0f7b',
        name: 'Onboarding Flow',
        status: 'disabled',
        created_at: '2025-02-01T00:00:00.000Z',
        updated_at: '2025-02-01T00:00:00.000Z',
      },
    ],
  };

  describe('when no pagination options are provided', () => {
    it('lists automations', async () => {
      mockSuccessResponse(response, {
        headers: {},
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = await resend.automations.list();
      expect(result).toEqual({
        data: response,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/automations',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });
  });

  describe('when pagination options are provided', () => {
    it('passes limit param and returns a response', async () => {
      mockSuccessResponse(response, {
        headers: {},
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.automations.list({ limit: 1 });
      expect(result).toEqual({
        data: response,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/automations?limit=1',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });

    it('passes after param and returns a response', async () => {
      mockSuccessResponse(response, {
        headers: {},
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.automations.list({
        limit: 1,
        after: 'cursor-value',
      });
      expect(result).toEqual({
        data: response,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/automations?limit=1&after=cursor-value',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });

    it('passes before param and returns a response', async () => {
      mockSuccessResponse(response, {
        headers: {},
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.automations.list({
        limit: 1,
        before: 'cursor-value',
      });
      expect(result).toEqual({
        data: response,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/automations?limit=1&before=cursor-value',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });
  });

  describe('when status filter is provided', () => {
    it('passes status param', async () => {
      mockSuccessResponse(response, {
        headers: {},
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.automations.list({ status: 'enabled' });
      expect(result).toEqual({
        data: response,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/automations?status=enabled',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });
  });
});

describe('get', () => {
  describe('when automation not found', () => {
    it('returns error', async () => {
      const response: ErrorResponse = {
        name: 'not_found',
        statusCode: 404,
        message: 'Automation not found',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 404,
        headers: {
          'content-type': 'application/json',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.automations.get(
        '559ac32e-9ef5-46fb-82a1-b76b840c0f7b',
      );

      await expect(result).resolves.toMatchInlineSnapshot(`
          {
            "data": null,
            "error": {
              "message": "Automation not found",
              "name": "not_found",
              "statusCode": 404,
            },
            "headers": {
              "content-type": "application/json",
            },
          }
        `);
    });
  });

  it('gets an automation', async () => {
    const response: GetAutomationResponseSuccess = {
      object: 'automation',
      id: '559ac32e-9ef5-46fb-82a1-b76b840c0f7b',
      name: 'Welcome Flow',
      status: 'enabled',
      created_at: '2025-01-01T00:00:00.000Z',
      updated_at: '2025-01-01T00:00:00.000Z',
      steps: [
        {
          key: 'step-1',
          type: 'trigger',
          config: { event_name: 'user.created' },
        },
      ],
      connections: [],
    };

    fetchMock.mockOnce(JSON.stringify(response), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });

    const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

    await expect(
      resend.automations.get('559ac32e-9ef5-46fb-82a1-b76b840c0f7b'),
    ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "connections": [],
            "created_at": "2025-01-01T00:00:00.000Z",
            "id": "559ac32e-9ef5-46fb-82a1-b76b840c0f7b",
            "name": "Welcome Flow",
            "object": "automation",
            "status": "enabled",
            "steps": [
              {
                "config": {
                  "event_name": "user.created",
                },
                "key": "step-1",
                "type": "trigger",
              },
            ],
            "updated_at": "2025-01-01T00:00:00.000Z",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
  });
});

describe('remove', () => {
  it('removes an automation', async () => {
    const id = 'b01e0de9-7c27-4a53-bf38-2e3f98389a65';
    const response: RemoveAutomationResponseSuccess = {
      object: 'automation',
      id,
      deleted: true,
    };
    fetchMock.mockOnce(JSON.stringify(response), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });

    const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

    await expect(resend.automations.remove(id)).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "deleted": true,
            "id": "b01e0de9-7c27-4a53-bf38-2e3f98389a65",
            "object": "automation",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
  });
});

describe('update', () => {
  it('updates automation status', async () => {
    const id = '71cdfe68-cf79-473a-a9d7-21f91db6a526';
    const response: UpdateAutomationResponseSuccess = {
      object: 'automation',
      id,
    };

    fetchMock.mockOnce(JSON.stringify(response), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });

    const data = await resend.automations.update(id, { status: 'disabled' });
    expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "id": "71cdfe68-cf79-473a-a9d7-21f91db6a526",
            "object": "automation",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.resend.com/automations/${id}`,
      expect.objectContaining({
        method: 'PATCH',
        headers: expect.any(Headers),
        body: JSON.stringify({ status: 'disabled' }),
      }),
    );
  });

  it('updates automation steps only', async () => {
    const id = '71cdfe68-cf79-473a-a9d7-21f91db6a526';
    const response: UpdateAutomationResponseSuccess = {
      object: 'automation',
      id,
    };

    fetchMock.mockOnce(JSON.stringify(response), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });

    await resend.automations.update(id, {
      steps: [
        {
          key: 'trigger',
          type: 'trigger',
          config: { eventName: 'user.created' },
        },
      ],
    });

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.resend.com/automations/${id}`,
      expect.objectContaining({
        method: 'PATCH',
        headers: expect.any(Headers),
        body: JSON.stringify({
          steps: [
            {
              key: 'trigger',
              type: 'trigger',
              config: { event_name: 'user.created' },
            },
          ],
        }),
      }),
    );
  });

  it('updates automation connections only', async () => {
    const id = '71cdfe68-cf79-473a-a9d7-21f91db6a526';
    const response: UpdateAutomationResponseSuccess = {
      object: 'automation',
      id,
    };

    fetchMock.mockOnce(JSON.stringify(response), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });

    await resend.automations.update(id, {
      connections: [{ from: 'trigger', to: 'welcome_email', type: 'default' }],
    });

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.resend.com/automations/${id}`,
      expect.objectContaining({
        method: 'PATCH',
        headers: expect.any(Headers),
        body: JSON.stringify({
          connections: [
            { from: 'trigger', to: 'welcome_email', type: 'default' },
          ],
        }),
      }),
    );
  });

  it('updates automation name', async () => {
    const id = '71cdfe68-cf79-473a-a9d7-21f91db6a526';
    const response: UpdateAutomationResponseSuccess = {
      object: 'automation',
      id,
    };

    fetchMock.mockOnce(JSON.stringify(response), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });

    await resend.automations.update(id, {
      name: 'Updated Flow',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.resend.com/automations/${id}`,
      expect.objectContaining({
        method: 'PATCH',
        headers: expect.any(Headers),
        body: JSON.stringify({ name: 'Updated Flow' }),
      }),
    );
  });
});

describe('stop', () => {
  it('stops an automation', async () => {
    const id = '71cdfe68-cf79-473a-a9d7-21f91db6a526';
    const response: StopAutomationResponseSuccess = {
      object: 'automation',
      id,
      status: 'disabled',
    };

    fetchMock.mockOnce(JSON.stringify(response), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });

    const data = await resend.automations.stop(id);
    expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "id": "71cdfe68-cf79-473a-a9d7-21f91db6a526",
            "object": "automation",
            "status": "disabled",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.resend.com/automations/${id}/stop`,
      expect.objectContaining({
        method: 'POST',
        headers: expect.any(Headers),
      }),
    );
  });
});
