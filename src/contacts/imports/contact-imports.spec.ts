import createFetchMock from 'vitest-fetch-mock';
import { Resend } from '../../resend';
import { mockSuccessResponse } from '../../test-utils/mock-fetch';
import type {
  CreateContactImportOptions,
  CreateContactImportResponseSuccess,
} from './interfaces/create-contact-import.interface';
import type { GetContactImportResponseSuccess } from './interfaces/get-contact-import.interface';
import type {
  ListContactImportsOptions,
  ListContactImportsResponseSuccess,
} from './interfaces/list-contact-imports.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('ContactImports', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('create', () => {
    it('creates a contact import with multipart form data', async () => {
      const payload: CreateContactImportOptions = {
        file: new Blob(['email,first_name\nfoo@example.com,Foo\n'], {
          type: 'text/csv',
        }),
        columnMap: {
          email: 'Email',
          firstName: 'First Name',
          lastName: 'Last Name',
          unsubscribed: 'Unsubscribed',
          properties: {
            plan: {
              column: 'Plan',
              type: 'string',
            },
          },
        },
        onConflict: 'upsert',
        segments: [{ id: '78261eea-8f8b-4381-83c6-79fa7120f1cf' }],
        topics: [
          {
            id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
            subscription: 'opt_in',
          },
        ],
      };
      const response: CreateContactImportResponseSuccess = {
        object: 'contact_import',
        id: '479e3145-dd38-476b-932c-529ceb705947',
      };

      mockSuccessResponse(response, { status: 201 });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.imports.create(payload),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "id": "479e3145-dd38-476b-932c-529ceb705947",
            "object": "contact_import",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

      const [, request] = fetchMock.mock.calls[0];
      const headers = request?.headers as Headers;
      const body = request?.body as FormData;

      expect(fetchMock.mock.calls[0][0]).toBe(
        'https://api.resend.com/contacts/imports',
      );
      expect(headers.get('Content-Type')).toBeNull();
      expect(body).toBeInstanceOf(FormData);
      expect(body.get('file')).toBeTruthy();
      expect(body.get('column_map')).toBe(
        JSON.stringify({
          email: 'Email',
          first_name: 'First Name',
          last_name: 'Last Name',
          unsubscribed: 'Unsubscribed',
          properties: {
            plan: {
              column: 'Plan',
              type: 'string',
            },
          },
        }),
      );
      expect(body.get('on_conflict')).toBe('upsert');
      expect(body.get('segments')).toBe(
        JSON.stringify([{ id: '78261eea-8f8b-4381-83c6-79fa7120f1cf' }]),
      );
      expect(body.get('topics')).toBe(
        JSON.stringify([
          {
            id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
            subscription: 'opt_in',
          },
        ]),
      );
    });
  });

  describe('list', () => {
    it('lists contact imports', async () => {
      const response: ListContactImportsResponseSuccess = {
        object: 'list',
        has_more: false,
        data: [
          {
            object: 'contact_import',
            id: '479e3145-dd38-476b-932c-529ceb705947',
            status: 'completed',
            created_at: '2026-05-15T18:32:37.823Z',
            completed_at: '2026-05-15T18:33:42.916Z',
            counts: {
              total: 1200,
              created: 800,
              updated: 300,
              skipped: 75,
              failed: 25,
            },
          },
        ],
      };

      mockSuccessResponse(response, {});

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.imports.list(),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "data": [
              {
                "completed_at": "2026-05-15T18:33:42.916Z",
                "counts": {
                  "created": 800,
                  "failed": 25,
                  "skipped": 75,
                  "total": 1200,
                  "updated": 300,
                },
                "created_at": "2026-05-15T18:32:37.823Z",
                "id": "479e3145-dd38-476b-932c-529ceb705947",
                "object": "contact_import",
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
      expect(fetchMock.mock.calls[0][0]).toBe(
        'https://api.resend.com/contacts/imports',
      );
    });

    it('lists contact imports with pagination and status', async () => {
      const options: ListContactImportsOptions = {
        limit: 10,
        status: 'completed',
      };
      const response: ListContactImportsResponseSuccess = {
        object: 'list',
        has_more: false,
        data: [],
      };

      mockSuccessResponse(response, {});

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await resend.contacts.imports.list(options);

      expect(fetchMock.mock.calls[0][0]).toBe(
        'https://api.resend.com/contacts/imports?limit=10&status=completed',
      );
    });
  });

  describe('get', () => {
    it('retrieves a contact import', async () => {
      const response: GetContactImportResponseSuccess = {
        object: 'contact_import',
        id: '479e3145-dd38-476b-932c-529ceb705947',
        status: 'completed',
        created_at: '2026-05-15T18:32:37.823Z',
        completed_at: '2026-05-15T18:33:42.916Z',
        counts: {
          total: 1200,
          created: 800,
          updated: 300,
          skipped: 75,
          failed: 25,
        },
      };

      mockSuccessResponse(response, {});

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.imports.get('479e3145-dd38-476b-932c-529ceb705947'),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "completed_at": "2026-05-15T18:33:42.916Z",
            "counts": {
              "created": 800,
              "failed": 25,
              "skipped": 75,
              "total": 1200,
              "updated": 300,
            },
            "created_at": "2026-05-15T18:32:37.823Z",
            "id": "479e3145-dd38-476b-932c-529ceb705947",
            "object": "contact_import",
            "status": "completed",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
      expect(fetchMock.mock.calls[0][0]).toBe(
        'https://api.resend.com/contacts/imports/479e3145-dd38-476b-932c-529ceb705947',
      );
    });
  });
});
