import createFetchMock from 'vitest-fetch-mock';
import { Resend } from '../resend';
import {
  mockErrorResponse,
  mockSuccessResponse,
} from '../test-utils/mock-fetch';
import type {
  GetAutomationRunOptions,
  GetAutomationRunResponseSuccess,
} from './interfaces/get-automation-run.interface';
import type {
  ListAutomationRunsOptions,
  ListAutomationRunsResponseSuccess,
} from './interfaces/list-automation-runs.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

afterEach(() => fetchMock.resetMocks());
afterAll(() => fetchMocker.disableMocks());

describe('get', () => {
  it('gets an automation run', async () => {
    const options: GetAutomationRunOptions = {
      automationId: 'wf_123',
      runId: 'wr_456',
    };
    const response: GetAutomationRunResponseSuccess = {
      object: 'automation_run',
      id: 'wr_456',
      status: 'completed',
      started_at: '2024-01-01T00:00:00.000Z',
      completed_at: '2024-01-01T00:01:00.000Z',
      created_at: '2024-01-01T00:00:00.000Z',
      steps: [
        {
          key: 'trigger_1',
          type: 'trigger',
          status: 'completed',
          output: null,
          error: null,
          started_at: '2024-01-01T00:00:00.000Z',
          completed_at: '2024-01-01T00:00:01.000Z',
          created_at: '2024-01-01T00:00:00.000Z',
        },
      ],
    };

    mockSuccessResponse(response, {});

    const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
    await expect(
      resend.automations.runs.get(options),
    ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "completed_at": "2024-01-01T00:01:00.000Z",
            "created_at": "2024-01-01T00:00:00.000Z",
            "id": "wr_456",
            "object": "automation_run",
            "started_at": "2024-01-01T00:00:00.000Z",
            "status": "completed",
            "steps": [
              {
                "completed_at": "2024-01-01T00:00:01.000Z",
                "created_at": "2024-01-01T00:00:00.000Z",
                "error": null,
                "key": "trigger_1",
                "output": null,
                "started_at": "2024-01-01T00:00:00.000Z",
                "status": "completed",
                "type": "trigger",
              },
            ],
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
  });

  it('returns error', async () => {
    const options: GetAutomationRunOptions = {
      automationId: 'wf_123',
      runId: 'wr_invalid',
    };

    mockErrorResponse(
      { name: 'not_found', message: 'Automation run not found' },
      {},
    );

    const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
    const result = await resend.automations.runs.get(options);
    expect(result.error).not.toBeNull();
  });
});

describe('list', () => {
  it('lists automation runs', async () => {
    const options: ListAutomationRunsOptions = {
      automationId: 'wf_123',
    };
    const response: ListAutomationRunsResponseSuccess = {
      object: 'list',
      data: [
        {
          id: 'wr_456',
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
      resend.automations.runs.list(options),
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

  it('lists automation runs with pagination', async () => {
    const options: ListAutomationRunsOptions = {
      automationId: 'wf_123',
      limit: 1,
      after: 'wr_cursor',
    };
    const response: ListAutomationRunsResponseSuccess = {
      object: 'list',
      data: [
        {
          id: 'wr_789',
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
      resend.automations.runs.list(options),
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

  it('lists automation runs with status filter', async () => {
    const options: ListAutomationRunsOptions = {
      automationId: 'wf_123',
      status: ['running', 'failed'],
    };
    const response: ListAutomationRunsResponseSuccess = {
      object: 'list',
      data: [],
      has_more: false,
    };

    mockSuccessResponse(response, {});

    const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
    await resend.automations.runs.list(options);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.resend.com/automations/wf_123/runs?status=running%2Cfailed',
      expect.objectContaining({
        method: 'GET',
        headers: expect.any(Headers),
      }),
    );
  });

  it('returns error', async () => {
    const options: ListAutomationRunsOptions = {
      automationId: 'wf_invalid',
    };

    mockErrorResponse(
      { name: 'not_found', message: 'Automation not found' },
      {},
    );

    const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
    const result = await resend.automations.runs.list(options);
    expect(result.error).not.toBeNull();
  });
});
