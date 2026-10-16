import createFetchMock from 'vitest-fetch-mock';
import type { Response } from '../interfaces';
import { Resend } from '../resend';
import { mockSuccessResponse } from '../test-utils/mock-fetch';
import type { InboxSelector } from './interfaces/inbox';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

const threadId = 'b2c3d4e5-0000-4000-8000-000000000000';
const emailId = 'c3d4e5f6-0000-4000-8000-000000000000';
const labelId = 'a1b2c3d4-0000-4000-8000-000000000000';
const draftId = 'e5f6a7b8-0000-4000-8000-000000000000';

interface InboxMethod {
  name: string;
  method: string;
  path: string;
  body?: Record<string, unknown>;
  call: (inbox: InboxSelector) => Promise<Response<unknown>>;
}

const methods: InboxMethod[] = [
  {
    name: 'threads.list',
    method: 'GET',
    path: '/threads',
    call: (inbox) => resend.inboxes.threads.list(inbox),
  },
  {
    name: 'threads.search',
    method: 'GET',
    path: '/threads/search?query=invoice',
    call: (inbox) =>
      resend.inboxes.threads.search({ ...inbox, query: 'invoice' }),
  },
  {
    name: 'threads.get',
    method: 'GET',
    path: `/threads/${threadId}`,
    call: (inbox) => resend.inboxes.threads.get({ ...inbox, threadId }),
  },
  {
    name: 'threads.update',
    method: 'PATCH',
    path: `/threads/${threadId}`,
    body: { read: true },
    call: (inbox) =>
      resend.inboxes.threads.update({ ...inbox, threadId, read: true }),
  },
  {
    name: 'threads.remove',
    method: 'DELETE',
    path: `/threads/${threadId}`,
    call: (inbox) => resend.inboxes.threads.remove({ ...inbox, threadId }),
  },
  {
    name: 'threads.emails.list',
    method: 'GET',
    path: `/threads/${threadId}/emails`,
    call: (inbox) => resend.inboxes.threads.emails.list({ ...inbox, threadId }),
  },
  {
    name: 'threads.emails.get',
    method: 'GET',
    path: `/threads/${threadId}/emails/${emailId}`,
    call: (inbox) =>
      resend.inboxes.threads.emails.get({ ...inbox, threadId, emailId }),
  },
  {
    name: 'threads.emails.reply',
    method: 'POST',
    path: `/threads/${threadId}/emails/${emailId}/reply`,
    body: { text: 'Thanks' },
    call: (inbox) =>
      resend.inboxes.threads.emails.reply({
        ...inbox,
        threadId,
        emailId,
        text: 'Thanks',
      }),
  },
  {
    name: 'threads.emails.forward',
    method: 'POST',
    path: `/threads/${threadId}/emails/${emailId}/forward`,
    body: { to: 'ada@example.com' },
    call: (inbox) =>
      resend.inboxes.threads.emails.forward({
        ...inbox,
        threadId,
        emailId,
        to: 'ada@example.com',
      }),
  },
  {
    name: 'labels.list',
    method: 'GET',
    path: '/labels',
    call: (inbox) => resend.inboxes.labels.list(inbox),
  },
  {
    name: 'labels.create',
    method: 'POST',
    path: '/labels',
    body: { name: 'Urgent' },
    call: (inbox) => resend.inboxes.labels.create({ ...inbox, name: 'Urgent' }),
  },
  {
    name: 'labels.update',
    method: 'PATCH',
    path: `/labels/${labelId}`,
    body: { name: 'Later' },
    call: (inbox) =>
      resend.inboxes.labels.update({ ...inbox, labelId, name: 'Later' }),
  },
  {
    name: 'labels.remove',
    method: 'DELETE',
    path: `/labels/${labelId}`,
    call: (inbox) => resend.inboxes.labels.remove({ ...inbox, labelId }),
  },
  {
    name: 'drafts.list',
    method: 'GET',
    path: '/drafts',
    call: (inbox) => resend.inboxes.drafts.list(inbox),
  },
  {
    name: 'drafts.create',
    method: 'POST',
    path: '/drafts',
    body: { subject: 'Hello' },
    call: (inbox) =>
      resend.inboxes.drafts.create({ ...inbox, subject: 'Hello' }),
  },
  {
    name: 'drafts.get',
    method: 'GET',
    path: `/drafts/${draftId}`,
    call: (inbox) => resend.inboxes.drafts.get({ ...inbox, draftId }),
  },
  {
    name: 'drafts.update',
    method: 'PATCH',
    path: `/drafts/${draftId}`,
    body: { subject: 'Updated' },
    call: (inbox) =>
      resend.inboxes.drafts.update({ ...inbox, draftId, subject: 'Updated' }),
  },
  {
    name: 'drafts.remove',
    method: 'DELETE',
    path: `/drafts/${draftId}`,
    call: (inbox) => resend.inboxes.drafts.remove({ ...inbox, draftId }),
  },
  {
    name: 'drafts.send',
    method: 'POST',
    path: `/drafts/${draftId}/send`,
    call: (inbox) => resend.inboxes.drafts.send({ ...inbox, draftId }),
  },
  {
    name: 'agent.get',
    method: 'GET',
    path: '/agent',
    call: (inbox) => resend.inboxes.agent.get(inbox),
  },
  {
    name: 'agent.update',
    method: 'PATCH',
    path: '/agent',
    body: { tone: 'concise_casual' },
    call: (inbox) =>
      resend.inboxes.agent.update({ ...inbox, tone: 'concise_casual' }),
  },
];

describe('Inbox selector', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  it.each(methods)('$name targets the inbox by its email address', async ({
    method,
    path,
    body,
    call,
  }) => {
    mockSuccessResponse({}, { headers: {} });

    await call({ emailAddress: 'support+billing@example.com' });

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.resend.com/inboxes/support%2Bbilling%40example.com${path}`,
      expect.objectContaining(
        body ? { method, body: JSON.stringify(body) } : { method },
      ),
    );
  });

  it.each(
    methods,
  )('$name returns an error without an inbox ID or email address', async ({
    call,
  }) => {
    const data = await call({} as InboxSelector);

    expect(data).toEqual({
      data: null,
      headers: null,
      error: {
        message: 'Missing `inboxId` or `emailAddress` field.',
        statusCode: null,
        name: 'missing_required_field',
      },
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
