let rawRender: typeof import('@react-email/render').render | undefined =
  undefined;

export const render = async (
  element: React.ReactElement,
  options?: import('@react-email/render').Options,
) => {
  if (!rawRender) {
    try {
      rawRender = (await import('@react-email/render')).render;
    } catch (exception) {
      try {
        rawRender = (await import('@react-email/components')).render;
      } catch (exception) {
        throw new Error(
          'Failed to render React component. Make sure to install `@react-email/render` or `@react-email/components`',
        );
      }
    }
  }

  return rawRender(element, options);
};
