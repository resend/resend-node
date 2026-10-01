import createFetchMock from 'vitest-fetch-mock';
import type { RequestOptions } from './common/interfaces/request-options.interface';
import { Resend } from './resend';
import { mockSuccessResponse } from './test-utils/mock-fetch';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

type Call = (requestOptions: RequestOptions) => unknown;

const calls: Record<string, Call> = {
  'apiKeys.create': (o) => resend.apiKeys.create({ name: 'key' }, o),
  'apiKeys.list': (o) => resend.apiKeys.list({}, o),
  'apiKeys.update': (o) => resend.apiKeys.update('id', { name: 'key' }, o),
  'apiKeys.remove': (o) => resend.apiKeys.remove('id', o),

  'automations.create': (o) =>
    resend.automations.create(
      { name: 'automation', steps: [], connections: [] },
      o,
    ),
  'automations.list': (o) => resend.automations.list({}, o),
  'automations.get': (o) => resend.automations.get('id', o),
  'automations.remove': (o) => resend.automations.remove('id', o),
  'automations.update': (o) =>
    resend.automations.update('id', { name: 'automation' }, o),
  'automations.duplicate': (o) => resend.automations.duplicate('id', o),
  'automations.stop': (o) => resend.automations.stop('id', o),
  'automations.runs.get': (o) =>
    resend.automations.runs.get({ automationId: 'id', runId: 'id' }, o),
  'automations.runs.list': (o) =>
    resend.automations.runs.list({ automationId: 'id' }, o),

  'batch.send': (o) =>
    resend.batch.send(
      [{ from: 'a@resend.com', to: 'b@resend.com', subject: 's', text: 't' }],
      o,
    ),
  'batch.create': (o) =>
    resend.batch.create(
      [{ from: 'a@resend.com', to: 'b@resend.com', subject: 's', text: 't' }],
      o,
    ),

  'broadcasts.create': (o) =>
    resend.broadcasts.create(
      { segmentId: 'id', from: 'a@resend.com', subject: 's', text: 't' },
      o,
    ),
  'broadcasts.send': (o) => resend.broadcasts.send('id', undefined, o),
  'broadcasts.list': (o) => resend.broadcasts.list({}, o),
  'broadcasts.get': (o) => resend.broadcasts.get('id', o),
  'broadcasts.recipients': (o) =>
    resend.broadcasts.recipients('id', { type: 'delivered' }, o),
  'broadcasts.clickedLinks': (o) => resend.broadcasts.clickedLinks('id', {}, o),
  'broadcasts.remove': (o) => resend.broadcasts.remove('id', o),
  'broadcasts.cancel': (o) => resend.broadcasts.cancel('id', o),
  'broadcasts.duplicate': (o) => resend.broadcasts.duplicate('id', o),
  'broadcasts.update': (o) =>
    resend.broadcasts.update('id', { name: 'broadcast' }, o),

  'contactProperties.create': (o) =>
    resend.contactProperties.create({ key: 'plan', type: 'string' }, o),
  'contactProperties.list': (o) => resend.contactProperties.list({}, o),
  'contactProperties.get': (o) => resend.contactProperties.get('id', o),
  'contactProperties.update': (o) =>
    resend.contactProperties.update({ id: 'id', fallbackValue: 'free' }, o),
  'contactProperties.remove': (o) => resend.contactProperties.remove('id', o),

  'contacts.create': (o) =>
    resend.contacts.create({ email: 'a@resend.com' }, o),
  'contacts.list': (o) => resend.contacts.list({}, o),
  'contacts.get': (o) => resend.contacts.get('id', o),
  'contacts.update': (o) =>
    resend.contacts.update({ id: 'id', firstName: 'A' }, o),
  'contacts.remove': (o) => resend.contacts.remove('id', o),
  'contacts.imports.create': (o) =>
    resend.contacts.imports.create(
      { file: new Blob(['email\na@resend.com']) },
      o,
    ),
  'contacts.imports.list': (o) => resend.contacts.imports.list({}, o),
  'contacts.imports.get': (o) => resend.contacts.imports.get('id', o),
  'contacts.topics.update': (o) =>
    resend.contacts.topics.update({ id: 'id', topics: [] }, o),
  'contacts.topics.list': (o) => resend.contacts.topics.list({ id: 'id' }, o),
  'contacts.segments.list': (o) =>
    resend.contacts.segments.list({ contactId: 'id' }, o),
  'contacts.segments.add': (o) =>
    resend.contacts.segments.add({ contactId: 'id', segmentId: 'id' }, o),
  'contacts.segments.remove': (o) =>
    resend.contacts.segments.remove({ contactId: 'id', segmentId: 'id' }, o),

  'domains.create': (o) => resend.domains.create({ name: 'resend.com' }, o),
  'domains.list': (o) => resend.domains.list({}, o),
  'domains.get': (o) => resend.domains.get('id', o),
  'domains.update': (o) =>
    resend.domains.update({ id: 'id', openTracking: true }, o),
  'domains.remove': (o) => resend.domains.remove('id', o),
  'domains.verify': (o) => resend.domains.verify('id', o),
  'domains.claims.create': (o) =>
    resend.domains.claims.create({ name: 'resend.com' }, o),
  'domains.claims.get': (o) => resend.domains.claims.get('id', o),
  'domains.claims.verify': (o) => resend.domains.claims.verify('id', o),

  'emails.send': (o) =>
    resend.emails.send(
      { from: 'a@resend.com', to: 'b@resend.com', subject: 's', text: 't' },
      o,
    ),
  'emails.create': (o) =>
    resend.emails.create(
      { from: 'a@resend.com', to: 'b@resend.com', subject: 's', text: 't' },
      o,
    ),
  'emails.get': (o) => resend.emails.get('id', o),
  'emails.list': (o) => resend.emails.list({}, o),
  'emails.update': (o) =>
    resend.emails.update({ id: 'id', scheduledAt: 'in 1 hour' }, o),
  'emails.cancel': (o) => resend.emails.cancel('id', o),
  'emails.share': (o) => resend.emails.share('id', undefined, o),
  'emails.metrics': (o) => resend.emails.metrics({}, o),
  'emails.attachments.get': (o) =>
    resend.emails.attachments.get({ emailId: 'id', id: 'id' }, o),
  'emails.attachments.list': (o) =>
    resend.emails.attachments.list({ emailId: 'id' }, o),
  'emails.receiving.get': (o) => resend.emails.receiving.get('id', {}, o),
  'emails.receiving.list': (o) => resend.emails.receiving.list({}, o),
  'emails.receiving.attachments.get': (o) =>
    resend.emails.receiving.attachments.get({ emailId: 'id', id: 'id' }, o),
  'emails.receiving.attachments.list': (o) =>
    resend.emails.receiving.attachments.list({ emailId: 'id' }, o),

  'events.send': (o) =>
    resend.events.send({ event: 'signup', email: 'a@resend.com' }, o),
  'events.create': (o) => resend.events.create({ name: 'signup' }, o),
  'events.get': (o) => resend.events.get('id', o),
  'events.list': (o) => resend.events.list({}, o),
  'events.update': (o) => resend.events.update('id', { schema: null }, o),
  'events.remove': (o) => resend.events.remove('id', o),

  'logs.list': (o) => resend.logs.list({}, o),
  'logs.get': (o) => resend.logs.get('id', o),

  'oauthGrants.list': (o) => resend.oauthGrants.list({}, o),
  'oauthGrants.revoke': (o) => resend.oauthGrants.revoke('id', o),

  'segments.create': (o) => resend.segments.create({ name: 'segment' }, o),
  'segments.list': (o) => resend.segments.list({}, o),
  'segments.get': (o) => resend.segments.get('id', o),
  'segments.update': (o) =>
    resend.segments.update('id', { name: 'segment' }, o),
  'segments.remove': (o) => resend.segments.remove('id', o),

  'suppressions.add': (o) =>
    resend.suppressions.add({ email: 'a@resend.com' }, o),
  'suppressions.list': (o) => resend.suppressions.list({}, o),
  'suppressions.get': (o) => resend.suppressions.get('id', o),
  'suppressions.remove': (o) => resend.suppressions.remove('id', o),
  'suppressions.batch.add': (o) =>
    resend.suppressions.batch.add({ emails: ['a@resend.com'] }, o),
  'suppressions.batch.remove': (o) =>
    resend.suppressions.batch.remove({ emails: ['a@resend.com'] }, o),

  'templates.create': (o) =>
    resend.templates.create({ name: 'template', html: '<p>hi</p>' }, o),
  'templates.remove': (o) => resend.templates.remove('id', o),
  'templates.get': (o) => resend.templates.get('id', o),
  'templates.list': (o) => resend.templates.list({}, o),
  'templates.duplicate': (o) => resend.templates.duplicate('id', o),
  'templates.publish': (o) => resend.templates.publish('id', o),
  'templates.update': (o) =>
    resend.templates.update('id', { name: 'template' }, o),

  'topics.create': (o) =>
    resend.topics.create({ name: 'topic', defaultSubscription: 'opt_in' }, o),
  'topics.list': (o) => resend.topics.list(o),
  'topics.get': (o) => resend.topics.get('id', o),
  'topics.update': (o) => resend.topics.update({ id: 'id', name: 'topic' }, o),
  'topics.remove': (o) => resend.topics.remove('id', o),

  'usage.get': (o) => resend.usage.get(o),

  'webhooks.create': (o) =>
    resend.webhooks.create(
      { endpoint: 'https://resend.com', events: ['email.sent'] },
      o,
    ),
  'webhooks.get': (o) => resend.webhooks.get('id', o),
  'webhooks.list': (o) => resend.webhooks.list({}, o),
  'webhooks.update': (o) =>
    resend.webhooks.update('id', { endpoint: 'https://resend.com' }, o),
  'webhooks.remove': (o) => resend.webhooks.remove('id', o),
  'webhooks.rotateSigningSecret': (o) =>
    resend.webhooks.rotateSigningSecret('id', o),
  'webhooks.events.list': (o) =>
    resend.webhooks.events.list({ webhookId: 'id' }, o),
  'webhooks.events.get': (o) =>
    resend.webhooks.events.get({ webhookId: 'id', eventId: 'id' }, o),
  'webhooks.events.replay': (o) =>
    resend.webhooks.events.replay({ webhookId: 'id', eventId: 'id' }, o),
  'webhooks.events.attempts.list': (o) =>
    resend.webhooks.events.attempts.list({ webhookId: 'id', eventId: 'id' }, o),
};

const coveredElsewhere = new Set([
  'emails.receiving.forward',
  'webhooks.verify',
]);

function listPublicMethods(
  target: object,
  path: string,
  seen: Set<object>,
): string[] {
  if (seen.has(target)) {
    return [];
  }
  seen.add(target);

  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(target))
    .filter((name) => name !== 'constructor')
    .filter(
      (name) => typeof (target as Record<string, unknown>)[name] === 'function',
    )
    .map((name) => `${path}.${name}`);

  const nested = Object.entries(target).flatMap(([name, value]) =>
    value !== null && typeof value === 'object' && 'resend' in value
      ? listPublicMethods(value, `${path}.${name}`, seen)
      : [],
  );

  return [...methods, ...nested];
}

describe('per-request options', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  it('covers every public resource method', () => {
    const seen = new Set<object>();
    const privateMethods = new Set([
      'templates.performCreate',
      'contacts.imports.buildCreateFormData',
      'contacts.imports.buildColumnMap',
      'contacts.imports.appendField',
      'emails.receiving.forwardPassthrough',
      'emails.receiving.forwardWrapped',
      'emails.receiving.downloadRaw',
    ]);

    const methods = Object.entries(resend)
      .filter(
        ([, value]) =>
          value !== null && typeof value === 'object' && 'resend' in value,
      )
      .flatMap(([name, value]) => listPublicMethods(value, name, seen))
      .filter((method) => !privateMethods.has(method))
      .filter((method) => !coveredElsewhere.has(method))
      .sort();

    expect(methods).toEqual(Object.keys(calls).sort());
  });

  it.each(
    Object.entries(calls),
  )('%s forwards headers and signal', async (_, call) => {
    mockSuccessResponse({ object: 'list', data: [] });
    const controller = new AbortController();

    await call({
      headers: { 'X-Trace-Id': 'trace-123' },
      signal: controller.signal,
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const init = fetchMock.mock.calls[0][1];
    expect(new Headers(init?.headers).get('X-Trace-Id')).toBe('trace-123');
    expect(init?.signal).toBe(controller.signal);
  });

  it('emails.receiving.forward passes the signal to every request', async () => {
    mockSuccessResponse({
      object: 'email',
      id: 'id',
      subject: 'Hello',
      raw: { download_url: 'https://resend.com/raw.eml' },
    });
    fetchMock.mockOnce('Subject: Hello\r\n\r\nHi');
    mockSuccessResponse({ id: 'id' });
    const controller = new AbortController();

    await resend.emails.receiving.forward(
      {
        emailId: 'id',
        to: 'b@resend.com',
        from: 'a@resend.com',
        passthrough: false,
        text: 'FYI',
      },
      { headers: { 'X-Trace-Id': 'trace-123' }, signal: controller.signal },
    );

    expect(fetchMock).toHaveBeenCalledTimes(3);
    for (const [, init] of fetchMock.mock.calls) {
      expect(init?.signal).toBe(controller.signal);
    }
    const postInit = fetchMock.mock.calls[2][1];
    expect(new Headers(postInit?.headers).get('X-Trace-Id')).toBe('trace-123');
  });

  it('emails.receiving.forward returns an error when the raw download aborts', async () => {
    mockSuccessResponse({
      object: 'email',
      id: 'id',
      subject: 'Hello',
      raw: { download_url: 'https://resend.com/raw.eml' },
    });
    fetchMock.mockRejectOnce(new DOMException('Aborted', 'AbortError'));

    const result = await resend.emails.receiving.forward(
      { emailId: 'id', to: 'b@resend.com', from: 'a@resend.com' },
      { signal: new AbortController().signal },
    );

    expect(result.error?.message).toBe('Failed to download raw email content');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
