import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../../interfaces';
import { Resend } from '../../resend';
import { mockSuccessResponse } from '../../test-utils/mock-fetch';
import type { CreateInboxLabelResponseSuccess } from './interfaces/create-inbox-label.interface';
import type { ListInboxLabelsResponseSuccess } from './interfaces/list-inbox-labels.interface';
import type { RemoveInboxLabelResponseSuccess } from './interfaces/remove-inbox-label.interface';
import type { UpdateInboxLabelResponseSuccess } from './interfaces/update-inbox-label.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

const inboxId = '430eed87-632a-4ea6-90db-0aace67ec228';
const labelId = 'a1b2c3d4-0000-4000-8000-000000000000';

describe('Inbox labels', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('list', () => {
    it('lists labels', async () => {
      const response: ListInboxLabelsResponseSuccess = {
        object: 'list',
        has_more: false,
        data: [
          {
            id: labelId,
            name: 'Urgent',
            color: 'grass',
            created_at: '2026-09-01T00:00:00.000Z',
          },
        ],
      };

      mockSuccessResponse(response, { headers: {} });

      const data = await resend.inboxes.labels.list({ inboxId });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/labels`,
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });
  });

  describe('create', () => {
    it('creates a label', async () => {
      const response: CreateInboxLabelResponseSuccess = {
        object: 'inbox_label',
        id: labelId,
        name: 'Urgent',
        color: 'grass',
        created_at: '2026-09-01T00:00:00.000Z',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 201,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.labels.create({
        inboxId,
        name: 'Urgent',
        color: 'grass',
      });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/labels`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ name: 'Urgent', color: 'grass' }),
        }),
      );
    });

    it('returns a validation error', async () => {
      const error: ErrorResponse = {
        name: 'missing_required_field',
        statusCode: 422,
        message: 'A label name is required.',
      };

      fetchMock.mockOnce(JSON.stringify(error), {
        status: 422,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.labels.create({ inboxId, name: '' });

      expect(data.error).toEqual(error);
      expect(data.data).toBeNull();
    });
  });

  describe('update', () => {
    it('updates a label', async () => {
      const response: UpdateInboxLabelResponseSuccess = {
        object: 'inbox_label',
        id: labelId,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.labels.update({
        inboxId,
        labelId,
        name: 'Later',
      });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/labels/${labelId}`,
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ name: 'Later' }),
        }),
      );
    });
  });

  describe('remove', () => {
    it('removes a label', async () => {
      const response: RemoveInboxLabelResponseSuccess = {
        object: 'inbox_label',
        id: labelId,
        deleted: true,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.labels.remove({ inboxId, labelId });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/labels/${labelId}`,
        expect.objectContaining({
          method: 'DELETE',
        }),
      );
    });
  });
});
