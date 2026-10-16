import createFetchMock from 'vitest-fetch-mock';
import { Resend } from '../../../resend';
import type { InboxThreadLabelList } from '../interfaces/thread';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

const inboxId = '430eed87-632a-4ea6-90db-0aace67ec228';
const threadId = 'b2c3d4e5-0000-4000-8000-000000000000';
const labelId = 'a1b2c3d4-0000-4000-8000-000000000000';

const response: InboxThreadLabelList = {
  object: 'list',
  data: [{ id: labelId, name: 'Billing', color: '#3b82f6' }],
};

const remainingAfterRemove: InboxThreadLabelList = {
  object: 'list',
  data: [
    {
      id: 'c3d4e5f6-0000-4000-8000-000000000000',
      name: 'Urgent',
      color: '#e93d82',
    },
  ],
};

const mockResponse = (body: InboxThreadLabelList = response) =>
  fetchMock.mockOnce(JSON.stringify(body), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });

describe('Inbox thread labels', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('add', () => {
    it('adds labels to a thread', async () => {
      mockResponse();

      const data = await resend.inboxes.threads.labels.add({
        inboxId,
        threadId,
        labels: [labelId],
      });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/threads/${threadId}/labels`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ labels: [labelId] }),
        }),
      );
    });

    it('adds labels to a thread in an inbox addressed by email', async () => {
      mockResponse();

      await resend.inboxes.threads.labels.add({
        emailAddress: 'support+billing@example.com',
        threadId,
        labels: [labelId],
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/support%2Bbilling%40example.com/threads/${threadId}/labels`,
        expect.objectContaining({
          method: 'POST',
        }),
      );
    });
  });

  describe('set', () => {
    it('replaces the labels on a thread', async () => {
      mockResponse();

      const data = await resend.inboxes.threads.labels.set({
        inboxId,
        threadId,
        labels: [labelId],
      });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/threads/${threadId}/labels`,
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ labels: [labelId] }),
        }),
      );
    });

    it('clears the labels on a thread', async () => {
      fetchMock.mockOnce(JSON.stringify({ object: 'list', data: [] }), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      await resend.inboxes.threads.labels.set({
        inboxId,
        threadId,
        labels: [],
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/threads/${threadId}/labels`,
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ labels: [] }),
        }),
      );
    });

    it('replaces the labels on a thread in an inbox addressed by email', async () => {
      mockResponse();

      await resend.inboxes.threads.labels.set({
        emailAddress: 'support+billing@example.com',
        threadId,
        labels: [labelId],
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/support%2Bbilling%40example.com/threads/${threadId}/labels`,
        expect.objectContaining({
          method: 'PUT',
        }),
      );
    });
  });

  describe('remove', () => {
    it('removes a label from a thread', async () => {
      mockResponse(remainingAfterRemove);

      const data = await resend.inboxes.threads.labels.remove({
        inboxId,
        threadId,
        labelId,
      });

      expect(data.data).toEqual(remainingAfterRemove);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/threads/${threadId}/labels/${labelId}`,
        expect.objectContaining({
          method: 'DELETE',
        }),
      );
    });

    it('removes a label from a thread in an inbox addressed by email', async () => {
      mockResponse(remainingAfterRemove);

      await resend.inboxes.threads.labels.remove({
        emailAddress: 'support+billing@example.com',
        threadId,
        labelId,
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/support%2Bbilling%40example.com/threads/${threadId}/labels/${labelId}`,
        expect.objectContaining({
          method: 'DELETE',
        }),
      );
    });
  });
});
