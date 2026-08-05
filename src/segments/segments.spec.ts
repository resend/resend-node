import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import { mockSuccessResponse } from '../test-utils/mock-fetch';
import type {
  CreateSegmentOptions,
  CreateSegmentResponseSuccess,
} from './interfaces/create-segment-options.interface';
import type { GetSegmentsMetricsResponseSuccess } from './interfaces/get-metrics.interface';
import type { GetSegmentResponseSuccess } from './interfaces/get-segment.interface';
import type { ListSegmentsResponseSuccess } from './interfaces/list-segments.interface';
import type { RemoveSegmentResponseSuccess } from './interfaces/remove-segment.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Segments', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('create', () => {
    it('creates a segment', async () => {
      const payload: CreateSegmentOptions = { name: 'resend.com' };
      const response: CreateSegmentResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
        name: 'Resend',
        object: 'segment',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.segments.create(payload),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222",
            "name": "Resend",
            "object": "segment",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('throws error when missing name', async () => {
      const payload: CreateSegmentOptions = { name: '' };
      const response: ErrorResponse = {
        name: 'missing_required_field',
        message: 'Missing "name" field',
        statusCode: 422,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 422,
        headers: {
          'content-type': 'application/json',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.segments.create(payload);

      await expect(result).resolves.toMatchInlineSnapshot(`
        {
          "data": null,
          "error": {
            "message": "Missing "name" field",
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
    const response: ListSegmentsResponseSuccess = {
      object: 'list',
      has_more: false,
      data: [
        {
          id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
          name: 'resend.com',
          created_at: '2023-04-07T23:13:52.669661+00:00',
        },
        {
          id: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
          name: 'react.email',
          created_at: '2023-04-07T23:13:20.417116+00:00',
        },
      ],
    };

    describe('when no pagination options are provided', () => {
      it('lists audiences', async () => {
        mockSuccessResponse(response, {
          headers: {},
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = await resend.segments.list();
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/segments',
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
        const result = await resend.segments.list({ limit: 1 });
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/segments?limit=1',
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
        const result = await resend.segments.list({
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
          'https://api.resend.com/segments?limit=1&after=cursor-value',
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
        const result = await resend.segments.list({
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
          'https://api.resend.com/segments?limit=1&before=cursor-value',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });
    });
  });

  describe('metrics', () => {
    it('calls endpoint with no options and returns the response', async () => {
      const response: GetSegmentsMetricsResponseSuccess = {
        object: 'segments_metrics',
        metrics: ['all_contacts', 'subscribers', 'unsubscribers'],
        dimensions: [],
        sort_by: 'date',
        sort_order: 'desc',
        totals: {
          all_contacts: 12450,
          subscribers: 11800,
          unsubscribers: 650,
        },
      };

      mockSuccessResponse(response, {
        headers: {},
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.segments.metrics();

      expect(result).toEqual({
        data: response,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/segments/metrics',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });

    it('omits query params when passed as empty arrays', async () => {
      const response: GetSegmentsMetricsResponseSuccess = {
        object: 'segments_metrics',
        metrics: ['all_contacts', 'subscribers', 'unsubscribers'],
        dimensions: [],
        sort_by: 'date',
        sort_order: 'desc',
        totals: {
          all_contacts: 12450,
          subscribers: 11800,
          unsubscribers: 650,
        },
      };

      mockSuccessResponse(response, {
        headers: {},
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await resend.segments.metrics({
        metrics: [],
        dimensions: [],
        filter: { segmentId: [] },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/segments/metrics',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });

    it('calls endpoint passing metrics, dimensions and filter[segment_id]', async () => {
      const response: GetSegmentsMetricsResponseSuccess = {
        object: 'segments_metrics',
        metrics: ['all_contacts'],
        dimensions: ['segment'],
        sort_by: 'date',
        sort_order: 'desc',
        totals: {
          all_contacts: 4300,
        },
        data: [
          {
            segment_id: '78261eea-8f8b-4381-83c6-79fa7120f1cf',
            segment_name: 'Registered Users',
            all_contacts: 4300,
          },
        ],
      };

      mockSuccessResponse(response, {
        headers: {},
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.segments.metrics({
        metrics: ['all_contacts'],
        dimensions: ['segment'],
        filter: { segmentId: ['78261eea-8f8b-4381-83c6-79fa7120f1cf'] },
      });

      expect(result).toEqual({
        data: response,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/segments/metrics?metrics=all_contacts&dimensions=segment&filter%5Bsegment_id%5D=78261eea-8f8b-4381-83c6-79fa7120f1cf',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });

    it('calls endpoint passing sortBy and sortOrder', async () => {
      const response: GetSegmentsMetricsResponseSuccess = {
        object: 'segments_metrics',
        metrics: ['all_contacts'],
        dimensions: ['segment'],
        sort_by: 'date',
        sort_order: 'asc',
        totals: {
          all_contacts: 4300,
        },
        data: [
          {
            segment_id: '78261eea-8f8b-4381-83c6-79fa7120f1cf',
            segment_name: 'Registered Users',
            all_contacts: 4300,
          },
        ],
      };

      mockSuccessResponse(response, {
        headers: {},
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.segments.metrics({
        dimensions: ['segment'],
        sortBy: 'date',
        sortOrder: 'asc',
      });

      expect(result).toEqual({
        data: response,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/segments/metrics?dimensions=segment&sort_by=date&sort_order=asc',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });

    it('returns error when request fails', async () => {
      const response: ErrorResponse = {
        name: 'validation_error',
        message:
          'Invalid `metrics` value. Allowed: all_contacts, subscribers, unsubscribers.',
        statusCode: 422,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 422,
        headers: {
          'content-type': 'application/json',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = resend.segments.metrics();

      await expect(result).resolves.toMatchInlineSnapshot(`
        {
          "data": null,
          "error": {
            "message": "Invalid \`metrics\` value. Allowed: all_contacts, subscribers, unsubscribers.",
            "name": "validation_error",
            "statusCode": 422,
          },
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });
  });

  describe('get', () => {
    describe('when audience not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Audience not found',
          statusCode: 404,
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = resend.segments.get('1234');

        await expect(result).resolves.toMatchInlineSnapshot(`
          {
            "data": null,
            "error": {
              "message": "Audience not found",
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

    it('get audience', async () => {
      const response: GetSegmentResponseSuccess = {
        object: 'segment',
        id: 'fd61172c-cafc-40f5-b049-b45947779a29',
        name: 'resend.com',
        created_at: '2023-06-21T06:10:36.144Z',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.segments.get('1234')).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "created_at": "2023-06-21T06:10:36.144Z",
            "id": "fd61172c-cafc-40f5-b049-b45947779a29",
            "name": "resend.com",
            "object": "segment",
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
    it('removes a audience', async () => {
      const id = '5262504e-8ed7-4fac-bd16-0d4be94bc9f2';
      const response: RemoveSegmentResponseSuccess = {
        object: 'segment',
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

      await expect(resend.segments.remove(id)).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "deleted": true,
            "id": "5262504e-8ed7-4fac-bd16-0d4be94bc9f2",
            "object": "segment",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });
  });
});
