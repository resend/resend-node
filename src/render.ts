import type * as React from 'react';

export async function render(node: React.ReactNode): Promise<string> {
  let mod: {
    render?: (node: React.ReactNode) => Promise<string>;
    renderAsync?: (node: React.ReactNode) => Promise<string>;
  };
  try {
    mod = await import('@react-email/render');
  } catch {
    throw new Error(
      'Failed to render React component. Make sure to install `@react-email/render` or `@react-email/components`.',
    );
  }

  const renderFn = mod.render ?? mod.renderAsync;
  if (typeof renderFn !== 'function') {
    throw new Error(
      'Failed to render React component. Make sure to install `@react-email/render` (or an older version with renderAsync).',
    );
  }

  return renderFn(node);
}
