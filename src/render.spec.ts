import type * as React from 'react';
import { vi } from 'vitest';
import { render } from './render';

const mockRenderFn = vi.fn();
const mockRenderAsyncFn = vi.fn();

let packageExports: 'both' | 'renderOnly' | 'renderAsyncOnly' = 'both';

vi.mock('@react-email/render', () => ({
  get render() {
    return packageExports === 'renderAsyncOnly' ? undefined : mockRenderFn;
  },
  get renderAsync() {
    return packageExports === 'renderOnly' ? undefined : mockRenderAsyncFn;
  },
}));

describe('render', () => {
  const mockReactNode = {
    type: 'div',
    props: { children: 'Hello' },
  } as React.ReactElement;

  beforeEach(() => {
    packageExports = 'both';
    mockRenderFn.mockReset().mockResolvedValue('<html>Hello</html>');
    mockRenderAsyncFn.mockReset().mockResolvedValue('<html>Hello</html>');
  });

  it('calls render when @react-email/render exports render', async () => {
    const html = await render(mockReactNode);

    expect(html).toBe('<html>Hello</html>');
    expect(mockRenderFn).toHaveBeenCalledTimes(1);
    expect(mockRenderFn).toHaveBeenCalledWith(mockReactNode);
    expect(mockRenderAsyncFn).not.toHaveBeenCalled();
  });

  it('falls back to renderAsync when package only exports renderAsync', async () => {
    packageExports = 'renderAsyncOnly';
    mockRenderAsyncFn.mockResolvedValue(
      '<html>Rendered via renderAsync</html>',
    );

    const html = await render(mockReactNode);

    expect(html).toBe('<html>Rendered via renderAsync</html>');
    expect(mockRenderAsyncFn).toHaveBeenCalledTimes(1);
    expect(mockRenderAsyncFn).toHaveBeenCalledWith(mockReactNode);
    expect(mockRenderFn).not.toHaveBeenCalled();
  });

  it('prefers render over renderAsync when both are present', async () => {
    mockRenderFn.mockResolvedValue('<html>From render</html>');
    mockRenderAsyncFn.mockResolvedValue('<html>From renderAsync</html>');

    const html = await render(mockReactNode);

    expect(html).toBe('<html>From render</html>');
    expect(mockRenderFn).toHaveBeenCalled();
    expect(mockRenderAsyncFn).not.toHaveBeenCalled();
  });
});
