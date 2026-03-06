import createFetchMock from 'vitest-fetch-mock';
import { Resend } from '../resend';
import {
  mockErrorResponse,
  mockSuccessResponse,
} from '../test-utils/mock-fetch';
import type {
  GetWorkflowRunStepOptions,
  GetWorkflowRunStepResponseSuccess,
} from './interfaces/get-workflow-run-step.interface';
import type {
  ListWorkflowRunStepsOptions,
  ListWorkflowRunStepsResponseSuccess,
} from './interfaces/list-workflow-run-steps.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('WorkflowRunSteps', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('get', () => {
    it('gets a workflow run step', async () => {
      const options: GetWorkflowRunStepOptions = {
        workflowId: 'wf_123',
        runId: 'wr_456',
        stepId: 'wrs_789',
      };
      const response: GetWorkflowRunStepResponseSuccess = {
        object: 'workflow_run_step',
        id: 'wrs_789',
        step_id: 'step_1',
        type: 'trigger',
        config: { event_name: 'user.created' },
        status: 'completed',
        started_at: '2024-01-01T00:00:00.000Z',
        completed_at: '2024-01-01T00:01:00.000Z',
        created_at: '2024-01-01T00:00:00.000Z',
      };

      mockSuccessResponse(response, {});

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.workflows.runs.steps.get(options),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "completed_at": "2024-01-01T00:01:00.000Z",
            "config": {
              "event_name": "user.created",
            },
            "created_at": "2024-01-01T00:00:00.000Z",
            "id": "wrs_789",
            "object": "workflow_run_step",
            "started_at": "2024-01-01T00:00:00.000Z",
            "status": "completed",
            "step_id": "step_1",
            "type": "trigger",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('returns error', async () => {
      const options: GetWorkflowRunStepOptions = {
        workflowId: 'wf_123',
        runId: 'wr_456',
        stepId: 'wrs_invalid',
      };

      mockErrorResponse(
        { name: 'not_found', message: 'Workflow run step not found' },
        {},
      );

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.workflows.runs.steps.get(options);
      expect(result.error).not.toBeNull();
    });
  });

  describe('list', () => {
    it('lists workflow run steps', async () => {
      const options: ListWorkflowRunStepsOptions = {
        workflowId: 'wf_123',
        runId: 'wr_456',
      };
      const response: ListWorkflowRunStepsResponseSuccess = {
        object: 'list',
        data: [
          {
            id: 'wrs_789',
            step_id: 'step_1',
            type: 'trigger',
            status: 'completed',
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
        resend.workflows.runs.steps.list(options),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "data": [
              {
                "completed_at": "2024-01-01T00:01:00.000Z",
                "created_at": "2024-01-01T00:00:00.000Z",
                "id": "wrs_789",
                "started_at": "2024-01-01T00:00:00.000Z",
                "status": "completed",
                "step_id": "step_1",
                "type": "trigger",
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

    it('lists workflow run steps with pagination', async () => {
      const options: ListWorkflowRunStepsOptions = {
        workflowId: 'wf_123',
        runId: 'wr_456',
        limit: 1,
        after: 'wrs_cursor',
      };
      const response: ListWorkflowRunStepsResponseSuccess = {
        object: 'list',
        data: [
          {
            id: 'wrs_101',
            step_id: 'step_2',
            type: 'send_email',
            status: 'running',
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
        resend.workflows.runs.steps.list(options),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "data": [
              {
                "completed_at": null,
                "created_at": "2024-01-02T00:00:00.000Z",
                "id": "wrs_101",
                "started_at": "2024-01-02T00:00:00.000Z",
                "status": "running",
                "step_id": "step_2",
                "type": "send_email",
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
      const options: ListWorkflowRunStepsOptions = {
        workflowId: 'wf_invalid',
        runId: 'wr_invalid',
      };

      mockErrorResponse(
        { name: 'not_found', message: 'Workflow not found' },
        {},
      );

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.workflows.runs.steps.list(options);
      expect(result.error).not.toBeNull();
    });
  });
});
