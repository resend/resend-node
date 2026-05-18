import createFetchMock from 'vitest-fetch-mock';
import { Resend } from '../../resend';
import { mockSuccessResponse } from '../../test-utils/mock-fetch';
import type {
  ListContactImportsOptions,
  ListContactImportsResponseSuccess,
} from './interfaces/list-contact-imports.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('ContactImports', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

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
});
