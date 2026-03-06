import createFetchMock from 'vitest-fetch-mock';
import { Resend } from '../resend';
import {
  mockErrorResponse,
  mockSuccessResponse,
} from '../test-utils/mock-fetch';
import type {
  GetWorkflowRunOptions,
  GetWorkflowRunResponseSuccess,
} from './interfaces/get-workflow-run.interface';
import type {
  ListWorkflowRunsOptions,
  ListWorkflowRunsResponseSuccess,
} from './interfaces/list-workflow-runs.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('WorkflowRuns', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('get', () => {
    it('gets a workflow run', async () => {
      const options: GetWorkflowRunOptions = {
        workflowId: 'wf_123',
        runId: 'wr_456',
      };
      const response: GetWorkflowRunResponseSuccess = {
        object: 'workflow_run',
        id: 'wr_456',
        status: 'completed',
        trigger: {
          event_name: 'user.created',
          payload: { email: 'jane@example.com' },
        },
        started_at: '2024-01-01T00:00:00.000Z',
        completed_at: '2024-01-01T00:01:00.000Z',
        created_at: '2024-01-01T00:00:00.000Z',
      };

      mockSuccessResponse(response, {});

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.workflows.runs.get(options),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "completed_at": "2024-01-01T00:01:00.000Z",
            "created_at": "2024-01-01T00:00:00.000Z",
            "id": "wr_456",
            "object": "workflow_run",
            "started_at": "2024-01-01T00:00:00.000Z",
            "status": "completed",
            "trigger": {
              "event_name": "user.created",
              "payload": {
                "email": "jane@example.com",
              },
            },
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('returns error', async () => {
      const options: GetWorkflowRunOptions = {
        workflowId: 'wf_123',
        runId: 'wr_invalid',
      };

      mockErrorResponse(
        { name: 'not_found', message: 'Workflow run not found' },
        {},
      );

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.workflows.runs.get(options);
      expect(result.error).not.toBeNull();
    });
  });

  describe('list', () => {
    it('lists workflow runs', async () => {
      const options: ListWorkflowRunsOptions = {
        workflowId: 'wf_123',
      };
      const response: ListWorkflowRunsResponseSuccess = {
        object: 'list',
        data: [
          {
            id: 'wr_456',
            status: 'completed',
            trigger: { event_name: 'user.created' },
            started_at: '2024-01-01T00:00:00.000Z',
            completed_at: '2024-01-01T00:01:00.000Z',
            created_at: '2024-01-01T00:00:00.000Z',
          },
        ],
        has_more: false,
      };

      mockSuccessResponse(response, {});

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.workflows.runs.list(options),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "data": [
              {
                "completed_at": "2024-01-01T00:01:00.000Z",
                "created_at": "2024-01-01T00:00:00.000Z",
                "id": "wr_456",
                "started_at": "2024-01-01T00:00:00.000Z",
                "status": "completed",
                "trigger": {
                  "event_name": "user.created",
                },
              },
            ],
            "has_more": false,
            "object": "list",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('lists workflow runs with pagination', async () => {
      const options: ListWorkflowRunsOptions = {
        workflowId: 'wf_123',
        limit: 1,
        after: 'wr_cursor',
      };
      const response: ListWorkflowRunsResponseSuccess = {
        object: 'list',
        data: [
          {
            id: 'wr_789',
            status: 'running',
            trigger: null,
            started_at: '2024-01-02T00:00:00.000Z',
            completed_at: null,
            created_at: '2024-01-02T00:00:00.000Z',
          },
        ],
        has_more: true,
      };

      mockSuccessResponse(response, {});

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.workflows.runs.list(options),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "data": [
              {
                "completed_at": null,
                "created_at": "2024-01-02T00:00:00.000Z",
                "id": "wr_789",
                "started_at": "2024-01-02T00:00:00.000Z",
                "status": "running",
                "trigger": null,
              },
            ],
            "has_more": true,
            "object": "list",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('returns error', async () => {
      const options: ListWorkflowRunsOptions = {
        workflowId: 'wf_invalid',
      };

      mockErrorResponse(
        { name: 'not_found', message: 'Workflow not found' },
        {},
      );

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.workflows.runs.list(options);
      expect(result.error).not.toBeNull();
    });
  });
});
