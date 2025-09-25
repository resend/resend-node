import type { CreateTemplateOptions } from '../../templates/interfaces/create-template-options.interface';
import type { UpdateTemplateOptions } from '../../templates/interfaces/update-template.interface';
import { parseTemplateToApiOptions } from './parse-template-to-api-options';

describe('parseTemplateToApiOptions', () => {
  it('should handle minimal template with only required fields', () => {
    const templatePayload: CreateTemplateOptions = {
      name: 'Welcome Template',
      html: '<h1>Welcome!</h1>',
    };

    const apiOptions = parseTemplateToApiOptions(templatePayload);

    expect(apiOptions).toEqual({
      name: 'Welcome Template',
      html: '<h1>Welcome!</h1>',
      subject: undefined,
      text: undefined,
      alias: undefined,
      from: undefined,
      reply_to: undefined,
      variables: undefined,
      react: undefined,
    });
  });

  it('should properly convert camelCase to snake_case for all fields', () => {
    const templatePayload: CreateTemplateOptions = {
      name: 'Newsletter Template',
      subject: 'Weekly Newsletter',
      html: '<h1>Newsletter for {{{userName}}}!</h1>',
      text: 'Newsletter for {{{userName}}}!',
      alias: 'newsletter',
      from: 'newsletter@example.com',
      replyTo: ['support@example.com', 'help@example.com'],
      variables: [
        {
          key: 'userName',
          fallbackValue: 'Subscriber',
          type: 'string',
        },
        {
          key: 'isVip',
          fallbackValue: false,
          type: 'boolean',
        },
      ],
    };

    const apiOptions = parseTemplateToApiOptions(templatePayload);

    expect(apiOptions).toEqual({
      name: 'Newsletter Template',
      subject: 'Weekly Newsletter',
      html: '<h1>Newsletter for {{{userName}}}!</h1>',
      text: 'Newsletter for {{{userName}}}!',
      alias: 'newsletter',
      from: 'newsletter@example.com',
      reply_to: ['support@example.com', 'help@example.com'],
      variables: [
        {
          key: 'userName',
          fallback_value: 'Subscriber',
          type: 'string',
        },
        {
          key: 'isVip',
          fallback_value: false,
          type: 'boolean',
        },
      ],
      react: undefined,
    });
  });

  it('should handle single replyTo email', () => {
    const templatePayload: CreateTemplateOptions = {
      name: 'Single Reply Template',
      html: '<h1>Test</h1>',
      replyTo: 'support@example.com',
    };

    const apiOptions = parseTemplateToApiOptions(templatePayload);

    expect(apiOptions.reply_to).toBe('support@example.com');
  });

  it('should handle update template options', () => {
    const updatePayload: UpdateTemplateOptions = {
      subject: 'Updated Subject',
      replyTo: 'updated@example.com',
      variables: [
        {
          key: 'status',
          fallbackValue: 'active',
          type: 'string',
        },
      ],
    };

    const apiOptions = parseTemplateToApiOptions(updatePayload);

    expect(apiOptions).toEqual({
      name: undefined,
      subject: 'Updated Subject',
      html: undefined,
      text: undefined,
      alias: undefined,
      from: undefined,
      reply_to: 'updated@example.com',
      variables: [
        {
          key: 'status',
          fallback_value: 'active',
          type: 'string',
        },
      ],
      react: undefined,
    });
  });

  it('should handle template with React component', () => {
    const mockReactComponent = {
      type: 'div',
      props: { children: 'Hello from React!' },
    } as React.ReactElement;

    const templatePayload: CreateTemplateOptions = {
      name: 'React Template',
      react: mockReactComponent,
    };

    const apiOptions = parseTemplateToApiOptions(templatePayload);

    expect(apiOptions.react).toBe(mockReactComponent);
    expect(apiOptions.html).toBeUndefined();
  });

  it('should handle variables with different types', () => {
    const templatePayload: CreateTemplateOptions = {
      name: 'Multi-type Template',
      html: '<h1>Test</h1>',
      variables: [
        {
          key: 'title',
          fallbackValue: 'Default Title',
          type: 'string',
        },
        {
          key: 'count',
          fallbackValue: 42,
          type: 'number',
        },
        {
          key: 'isEnabled',
          fallbackValue: true,
          type: 'boolean',
        },
        {
          key: 'optional',
          fallbackValue: null,
          type: 'string',
        },
      ],
    };

    const apiOptions = parseTemplateToApiOptions(templatePayload);

    expect(apiOptions.variables).toEqual([
      {
        key: 'title',
        fallback_value: 'Default Title',
        type: 'string',
      },
      {
        key: 'count',
        fallback_value: 42,
        type: 'number',
      },
      {
        key: 'isEnabled',
        fallback_value: true,
        type: 'boolean',
      },
      {
        key: 'optional',
        fallback_value: null,
        type: 'string',
      },
    ]);
  });

  it('should handle undefined variables', () => {
    const templatePayload: CreateTemplateOptions = {
      name: 'No Variables Template',
      html: '<h1>Simple template</h1>',
    };

    const apiOptions = parseTemplateToApiOptions(templatePayload);

    expect(apiOptions.variables).toBeUndefined();
  });

  it('should handle empty variables array', () => {
    const templatePayload: CreateTemplateOptions = {
      name: 'Empty Variables Template',
      html: '<h1>Template with empty variables</h1>',
      variables: [],
    };

    const apiOptions = parseTemplateToApiOptions(templatePayload);

    expect(apiOptions.variables).toEqual([]);
  });
});
