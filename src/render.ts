export async function render(node: React.ReactNode) {
  let render: typeof import('react-email').render;
  try {
    ({ render } = await import('react-email'));
  } catch {
    throw new Error(
      'Failed to render React component. Make sure to install `react-email`.',
    );
  }

  return render(node);
}
