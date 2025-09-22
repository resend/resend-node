export function render(node: unknown) {
  return new Promise<string>((resolve, reject) => {
    // Create an indirect require that bundlers won't statically analyze
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const req = Function('m', 'return require(m);') as (m: string) => any;
    // Try to load optional peer @react-email/render without triggering bundler resolution
    try {
      const mod = req('@react-email/render');

      const maybeRender =
        (mod && typeof mod.render === 'function' && mod.render) ||
        (mod?.default && typeof mod.default.render === 'function' && mod.default.render) ||
        (typeof mod.renderAsync === 'function' && mod.renderAsync) ||
        (mod?.default && typeof mod.default.renderAsync === 'function' && mod.default.renderAsync);

      if (maybeRender) {
        const out = maybeRender(node);
        if (out && typeof out.then === 'function') {
          (out as Promise<string>).then(resolve).catch(reject);
        } else {
          resolve(out as string);
        }
        return;
      }
    } catch {
      // ignore and fallback below
    }

    // Fallback: use react-dom/server to render to static markup
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { renderToStaticMarkup } = req('react-dom/server');
      const html: string = renderToStaticMarkup(node as any);
      resolve(html);
      return;
    } catch {
      // If even fallback fails, surface a helpful error
    }

    reject(
      Error(
        'Failed to render React component. Install `@react-email/render` or ensure `react-dom/server` is available.',
      ),
    );
  });
}
