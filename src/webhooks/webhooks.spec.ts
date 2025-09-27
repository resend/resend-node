import { Webhook } from 'svix';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Webhooks } from './webhooks';

const mocks = vi.hoisted(() => {
  const verify = vi.fn();
  const webhookConstructor = vi.fn(() => ({
    verify,
  }));

  return {
    verify,
    webhookConstructor,
  };
});

vi.mock('svix', () => ({
  Webhook: mocks.webhookConstructor,
}));

describe('Webhooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.verify.mockReset();
  });

  it('verifies payload using svix headers', () => {
    const options = {
      payload: '{"type":"email.sent"}',
      headers: {
        id: 'msg_123',
        timestamp: '1713984875',
        signature: 'v1,some-signature',
      },
      webhookSecret: 'whsec_123',
    };

    const expectedResult = { id: 'msg_123', status: 'verified' };
    mocks.verify.mockReturnValue(expectedResult);

    const result = new Webhooks().verify(options);

    expect(Webhook).toHaveBeenCalledWith(options.webhookSecret);
    expect(mocks.verify).toHaveBeenCalledWith(options.payload, {
      'svix-id': options.headers.id,
      'svix-timestamp': options.headers.timestamp,
      'svix-signature': options.headers.signature,
    });
    expect(result).toBe(expectedResult);
  });
});
