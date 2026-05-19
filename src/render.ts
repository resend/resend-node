export async function render(node: React.ReactNode) {
  let render: typeof import('@react-email/render').render;
  try {
    ({ render } = await import('@react-email/render'));
  } catch {
    throw new Error(
      'Failed to render React component. Make sure to install `@react-email/render` or `@react-email/components`.',
    );
  }

  return render(node);
}
