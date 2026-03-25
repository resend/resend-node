import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import { mockSuccessResponse } from '../test-utils/mock-fetch';
import type {
  CreateWorkflowOptions,
  CreateWorkflowResponseSuccess,
} from './interfaces/create-workflow-options.interface';
import type { GetWorkflowResponseSuccess } from './interfaces/get-workflow.interface';
import type { ListWorkflowsResponseSuccess } from './interfaces/list-workflows.interface';
import type { RemoveWorkflowResponseSuccess } from './interfaces/remove-workflow.interface';
import type { UpdateWorkflowResponseSuccess } from './interfaces/update-workflow.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

describe('Workflows', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('create', () => {
    it('creates a workflow', async () => {
      const response: CreateWorkflowResponseSuccess = {
        object: 'workflow',
        id: '71cdfe68-cf79-473a-a9d7-21f91db6a526',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const payload: CreateWorkflowOptions = {
        name: 'Welcome Flow',
        status: 'enabled',
        steps: [
          {
            ref: 'trigger',
            type: 'trigger',
            config: { eventName: 'user.created' },
          },
          {
            ref: 'welcome_email',
            type: 'send_email',
            config: { templateId: 'tpl-123' },
          },
        ],
        edges: [{ from: 'trigger', to: 'welcome_email', edgeType: 'default' }],
      };

      const data = await resend.workflows.create(payload);
      expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "id": "71cdfe68-cf79-473a-a9d7-21f91db6a526",
            "object": "workflow",
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

      const data = await resend.workflows.create({
        name: '',
        steps: [],
        edges: [],
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
    const response: ListWorkflowsResponseSuccess = {
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
      it('lists workflows', async () => {
        mockSuccessResponse(response, {
          headers: {},
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = await resend.workflows.list();
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/workflows',
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
        const result = await resend.workflows.list({ limit: 1 });
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/workflows?limit=1',
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
        const result = await resend.workflows.list({
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
          'https://api.resend.com/workflows?limit=1&after=cursor-value',
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
        const result = await resend.workflows.list({
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
          'https://api.resend.com/workflows?limit=1&before=cursor-value',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });
    });
  });

  describe('get', () => {
    describe('when workflow not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          statusCode: 404,
          message: 'Workflow not found',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = resend.workflows.get(
          '559ac32e-9ef5-46fb-82a1-b76b840c0f7b',
        );

        await expect(result).resolves.toMatchInlineSnapshot(`
          {
            "data": null,
            "error": {
              "message": "Workflow not found",
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

    it('gets a workflow', async () => {
      const response: GetWorkflowResponseSuccess = {
        object: 'workflow',
        id: '559ac32e-9ef5-46fb-82a1-b76b840c0f7b',
        name: 'Welcome Flow',
        status: 'enabled',
        created_at: '2025-01-01T00:00:00.000Z',
        updated_at: '2025-01-01T00:00:00.000Z',
        steps: [
          {
            id: 'step-1',
            type: 'trigger',
            config: { event_name: 'user.created' },
          },
        ],
        edges: [],
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.workflows.get('559ac32e-9ef5-46fb-82a1-b76b840c0f7b'),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "created_at": "2025-01-01T00:00:00.000Z",
            "edges": [],
            "id": "559ac32e-9ef5-46fb-82a1-b76b840c0f7b",
            "name": "Welcome Flow",
            "object": "workflow",
            "status": "enabled",
            "steps": [
              {
                "config": {
                  "event_name": "user.created",
                },
                "id": "step-1",
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
    it('removes a workflow', async () => {
      const id = 'b01e0de9-7c27-4a53-bf38-2e3f98389a65';
      const response: RemoveWorkflowResponseSuccess = {
        object: 'workflow',
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

      await expect(resend.workflows.remove(id)).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "deleted": true,
            "id": "b01e0de9-7c27-4a53-bf38-2e3f98389a65",
            "object": "workflow",
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
    it('updates a workflow', async () => {
      const id = '71cdfe68-cf79-473a-a9d7-21f91db6a526';
      const response: UpdateWorkflowResponseSuccess = {
        object: 'workflow',
        id,
        status: 'disabled',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.workflows.update(id, { status: 'disabled' });
      expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "id": "71cdfe68-cf79-473a-a9d7-21f91db6a526",
            "object": "workflow",
            "status": "disabled",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/workflows/${id}`,
        expect.objectContaining({
          method: 'PATCH',
          headers: expect.any(Headers),
          body: JSON.stringify({ status: 'disabled' }),
        }),
      );
    });
  });
});
