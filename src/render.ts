export function render(node: React.ReactNode) {
  return new Promise<string>((resolve, reject) => {
    // we don't use async here, because tsup transpiles it to
    // using a generator syntax that, if used in conjunction
    // with a bundler on the user's side, breaks these try-catch shenanigans
    import('@react-email/render')
      .then(({ render }) => {
        resolve(render(node));
      })
      .catch(() => {
        reject(
          Error(
            'Failed to render React component. Make sure to install `@react-email/render` or `@react-email/components`.',
          ),
        );
      });
  });
}
