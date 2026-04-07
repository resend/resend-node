import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../../interfaces';
import { Resend } from '../../resend';
import type { CreateTrackingResponseSuccess } from './interfaces/create-tracking-options.interface';
import type { GetTrackingResponseSuccess } from './interfaces/get-tracking.interface';
import type { ListTrackingResponseSuccess } from './interfaces/list-tracking.interface';
import type { RemoveTrackingResponseSuccess } from './interfaces/remove-tracking.interface';
import type { UpdateTrackingResponseSuccess } from './interfaces/update-tracking.interface';
import type { VerifyTrackingResponseSuccess } from './interfaces/verify-tracking.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const domainId = 'd91cd9bd-1176-434e-8a56-c187d6e3a9a4';
const trackingId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

describe('Tracking', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('create', () => {
    it('creates a tracking domain', async () => {
      const response: CreateTrackingResponseSuccess = {
        object: 'tracking',
        id: trackingId,
        name: 'track',
        full_name: 'track.example.com',
        status: 'pending',
        open_tracking: false,
        click_tracking: false,
        is_active: false,
        created_at: '2026-03-10T00:00:00.000Z',
        records: [
          {
            record: 'Tracking',
            type: 'CNAME',
            name: 'track.example.com',
            value: 'click-tracking.resend.com',
            ttl: 'Auto',
            status: 'pending',
          },
        ],
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 201,
        headers: { 'content-type': 'application/json' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.domains.tracking.create(domainId, {
        subdomain: 'track',
      });

      expect(result.data).toEqual(response);
      expect(result.error).toBeNull();
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/domains/${domainId}/tracking`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ subdomain: 'track' }),
        }),
      );
    });

    it('creates a tracking domain with open_tracking and click_tracking', async () => {
      const response: CreateTrackingResponseSuccess = {
        object: 'tracking',
        id: trackingId,
        name: 'track',
        full_name: 'track.example.com',
        status: 'pending',
        open_tracking: true,
        click_tracking: true,
        is_active: false,
        created_at: '2026-03-10T00:00:00.000Z',
        records: [
          {
            record: 'Tracking',
            type: 'CNAME',
            name: 'track.example.com',
            value: 'click-tracking.resend.com',
            ttl: 'Auto',
            status: 'pending',
          },
        ],
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 201,
        headers: { 'content-type': 'application/json' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.domains.tracking.create(domainId, {
        subdomain: 'track',
        open_tracking: true,
        click_tracking: true,
      });

      expect(result.data).toEqual(response);
      expect(result.error).toBeNull();
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/domains/${domainId}/tracking`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            subdomain: 'track',
            open_tracking: true,
            click_tracking: true,
          }),
        }),
      );
    });

    it('returns error when domain already has a tracking domain', async () => {
      const response: ErrorResponse = {
        name: 'validation_error',
        message:
          'A tracking domain already exists for this domain. Only one tracking domain per domain is allowed.',
        statusCode: 409,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 409,
        headers: { 'content-type': 'application/json' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.domains.tracking.create(domainId, {
        subdomain: 'track',
      });

      expect(result.data).toBeNull();
      expect(result.error).toEqual(response);
    });
  });

  describe('list', () => {
    it('lists tracking domains for a domain', async () => {
      const response: ListTrackingResponseSuccess = {
        object: 'list',
        data: [
          {
            object: 'tracking',
            id: trackingId,
            name: 'track',
            full_name: 'track.example.com',
            status: 'pending',
            open_tracking: false,
            click_tracking: false,
            is_active: false,
            created_at: '2026-03-10T00:00:00.000Z',
          },
        ],
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.domains.tracking.list(domainId);

      expect(result.data).toEqual(response);
      expect(result.error).toBeNull();
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/domains/${domainId}/tracking`,
        expect.objectContaining({ method: 'GET' }),
      );
    });
  });

  describe('get', () => {
    it('gets a tracking domain', async () => {
      const response: GetTrackingResponseSuccess = {
        object: 'tracking',
        id: trackingId,
        name: 'track',
        full_name: 'track.example.com',
        status: 'pending',
        open_tracking: false,
        click_tracking: false,
        is_active: false,
        created_at: '2026-03-10T00:00:00.000Z',
        records: [
          {
            record: 'Tracking',
            type: 'CNAME',
            name: 'track.example.com',
            value: 'click-tracking.resend.com',
            ttl: 'Auto',
            status: 'pending',
          },
        ],
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.domains.tracking.get(
        domainId,
        trackingId,
      );

      expect(result.data).toEqual(response);
      expect(result.error).toBeNull();
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/domains/${domainId}/tracking/${trackingId}`,
        expect.objectContaining({ method: 'GET' }),
      );
    });

    it('returns error when tracking domain not found', async () => {
      const response: ErrorResponse = {
        name: 'not_found',
        message: 'Tracking domain not found',
        statusCode: 404,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.domains.tracking.get(
        domainId,
        trackingId,
      );

      expect(result.data).toBeNull();
      expect(result.error).toEqual(response);
    });
  });

  describe('update', () => {
    it('updates a tracking domain', async () => {
      const response: UpdateTrackingResponseSuccess = {
        object: 'tracking',
        id: trackingId,
        name: 'track',
        full_name: 'track.example.com',
        status: 'verified',
        open_tracking: true,
        click_tracking: true,
        is_active: true,
        created_at: '2026-03-10T00:00:00.000Z',
        records: [
          {
            record: 'Tracking',
            type: 'CNAME',
            name: 'track.example.com',
            value: 'click-tracking.resend.com',
            ttl: 'Auto',
            status: 'verified',
          },
        ],
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.domains.tracking.update(
        domainId,
        trackingId,
        { is_active: true, open_tracking: true, click_tracking: true },
      );

      expect(result.data).toEqual(response);
      expect(result.error).toBeNull();
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/domains/${domainId}/tracking/${trackingId}`,
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({
            is_active: true,
            open_tracking: true,
            click_tracking: true,
          }),
        }),
      );
    });

    it('returns error when tracking domain is not verified', async () => {
      const response: ErrorResponse = {
        name: 'validation_error',
        message:
          'Tracking domain must be verified before it can be activated.',
        statusCode: 403,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 403,
        headers: { 'content-type': 'application/json' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.domains.tracking.update(
        domainId,
        trackingId,
        { is_active: true },
      );

      expect(result.data).toBeNull();
      expect(result.error).toEqual(response);
    });
  });

  describe('remove', () => {
    it('removes a tracking domain', async () => {
      const response: RemoveTrackingResponseSuccess = {
        object: 'tracking',
        id: trackingId,
        deleted: true,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.domains.tracking.remove(
        domainId,
        trackingId,
      );

      expect(result.data).toEqual(response);
      expect(result.error).toBeNull();
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/domains/${domainId}/tracking/${trackingId}`,
        expect.objectContaining({ method: 'DELETE' }),
      );
    });
  });

  describe('verify', () => {
    it('verifies a tracking domain', async () => {
      const response: VerifyTrackingResponseSuccess = {
        object: 'tracking',
        id: trackingId,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = await resend.domains.tracking.verify(
        domainId,
        trackingId,
      );

      expect(result.data).toEqual(response);
      expect(result.error).toBeNull();
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/domains/${domainId}/tracking/${trackingId}/verify`,
        expect.objectContaining({ method: 'POST' }),
      );
    });
  });
});
