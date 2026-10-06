import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../../interfaces';
import { Resend } from '../../resend';
import { mockSuccessResponse } from '../../test-utils/mock-fetch';
import type { GetInboxAgentResponseSuccess } from './interfaces/get-inbox-agent.interface';
import type { UpdateInboxAgentResponseSuccess } from './interfaces/update-inbox-agent.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

const inboxId = '430eed87-632a-4ea6-90db-0aace67ec228';
const agentId = 'a1f84a4e-6f2b-4f0a-9c1d-8a2e5b3c7d90';

describe('Inbox agent', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('get', () => {
    it('gets the agent settings', async () => {
      const response: GetInboxAgentResponseSuccess = {
        object: 'inbox_agent',
        instructions: 'Answer refund questions yourself.',
        tone: 'friendly and concise',
        enabled_actions: ['draft_reply', 'add_labels'],
      };

      mockSuccessResponse(response, { headers: {} });

      const data = await resend.inboxes.agent.get({ inboxId });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/agent`,
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });
  });

  describe('update', () => {
    it('updates the agent settings', async () => {
      const response: UpdateInboxAgentResponseSuccess = {
        object: 'inbox_agent',
        id: agentId,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.agent.update({
        inboxId,
        instructions: 'Answer refund questions yourself.',
        enabledActions: ['draft_reply'],
      });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/agent`,
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({
            instructions: 'Answer refund questions yourself.',
            enabled_actions: ['draft_reply'],
          }),
        }),
      );
    });

    it('sends null to clear the tone', async () => {
      const response: UpdateInboxAgentResponseSuccess = {
        object: 'inbox_agent',
        id: agentId,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      await resend.inboxes.agent.update({ inboxId, tone: null });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/agent`,
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ tone: null }),
        }),
      );
    });

    it('returns a validation error', async () => {
      const error: ErrorResponse = {
        name: 'validation_error',
        statusCode: 422,
        message: 'The tone must be 64 characters or less.',
      };

      fetchMock.mockOnce(JSON.stringify(error), {
        status: 422,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.agent.update({
        inboxId,
        tone: 'x'.repeat(65),
      });

      expect(data.error).toEqual(error);
      expect(data.data).toBeNull();
    });
  });
});
