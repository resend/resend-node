import { Resend } from './resend';

describe('Resend', () => {
  it('should use overloaded fetch properly', async () => {
    const overloadingFetch = vi.fn(
      () =>
        'this is the overloaded fetch response, it completely differs from the normal response',
    );
    const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
      // @ts-expect-error This is fine for testing purposes
      fetch: overloadingFetch,
    });

    await resend.fetchRequest('n/a');

    expect(overloadingFetch).toHaveBeenCalledOnce();
  });
});
