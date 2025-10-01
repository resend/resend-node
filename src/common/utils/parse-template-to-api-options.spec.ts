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
    });
  });

  it('should not include React component in API options', () => {
    const mockReactComponent = {
      type: 'div',
      props: { children: 'Hello from React!' },
    } as React.ReactElement;

    const templatePayload: CreateTemplateOptions = {
      name: 'React Template',
      react: mockReactComponent,
    };

    const apiOptions = parseTemplateToApiOptions(templatePayload);

    // React component should not be included in API options
    expect(apiOptions).toEqual({
      name: 'React Template',
      subject: undefined,
      html: undefined,
      text: undefined,
      alias: undefined,
      from: undefined,
      reply_to: undefined,
      variables: undefined,
    });
    expect(apiOptions).not.toHaveProperty('react');
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

  it('should handle object and list variable types for create template', () => {
    const templatePayload: CreateTemplateOptions = {
      name: 'Complex Variables Template',
      html: '<h1>Complex template</h1>',
      variables: [
        {
          key: 'userProfile',
          type: 'object',
          fallbackValue: { name: 'John', age: 30 },
        },
        {
          key: 'userProfileNull',
          type: 'object',
          fallbackValue: null,
        },
        {
          key: 'tags',
          type: 'list',
          fallbackValue: ['premium', 'vip'],
        },
        {
          key: 'scores',
          type: 'list',
          fallbackValue: [95, 87, 92],
        },
        {
          key: 'flags',
          type: 'list',
          fallbackValue: [true, false, true],
        },
        {
          key: 'items',
          type: 'list',
          fallbackValue: [{ id: 1 }, { id: 2 }],
        },
        {
          key: 'emptyList',
          type: 'list',
          fallbackValue: null,
        },
      ],
    };

    const apiOptions = parseTemplateToApiOptions(templatePayload);

    expect(apiOptions.variables).toEqual([
      {
        key: 'userProfile',
        type: 'object',
        fallback_value: { name: 'John', age: 30 },
      },
      {
        key: 'userProfileNull',
        type: 'object',
        fallback_value: null,
      },
      {
        key: 'tags',
        type: 'list',
        fallback_value: ['premium', 'vip'],
      },
      {
        key: 'scores',
        type: 'list',
        fallback_value: [95, 87, 92],
      },
      {
        key: 'flags',
        type: 'list',
        fallback_value: [true, false, true],
      },
      {
        key: 'items',
        type: 'list',
        fallback_value: [{ id: 1 }, { id: 2 }],
      },
      {
        key: 'emptyList',
        type: 'list',
        fallback_value: null,
      },
    ]);
  });

  it('handles object and list variable types for update template', () => {
    const updatePayload: UpdateTemplateOptions = {
      subject: 'Updated Complex Template',
      variables: [
        {
          key: 'config',
          type: 'object',
          fallbackValue: { theme: 'dark', lang: 'en' },
        },
        {
          key: 'configNull',
          type: 'object',
          fallbackValue: null,
        },
        {
          key: 'permissions',
          type: 'list',
          fallbackValue: ['read', 'write'],
        },
        {
          key: 'counts',
          type: 'list',
          fallbackValue: [10, 20, 30],
        },
        {
          key: 'enabled',
          type: 'list',
          fallbackValue: [true, false],
        },
        {
          key: 'metadata',
          type: 'list',
          fallbackValue: [{ key: 'a' }, { key: 'b' }],
        },
        {
          key: 'emptyList',
          type: 'list',
          fallbackValue: null,
        },
      ],
    };

    const apiOptions = parseTemplateToApiOptions(updatePayload);

    expect(apiOptions.variables).toEqual([
      {
        key: 'config',
        type: 'object',
        fallback_value: { theme: 'dark', lang: 'en' },
      },
      {
        key: 'configNull',
        type: 'object',
        fallback_value: null,
      },
      {
        key: 'permissions',
        type: 'list',
        fallback_value: ['read', 'write'],
      },
      {
        key: 'counts',
        type: 'list',
        fallback_value: [10, 20, 30],
      },
      {
        key: 'enabled',
        type: 'list',
        fallback_value: [true, false],
      },
      {
        key: 'metadata',
        type: 'list',
        fallback_value: [{ key: 'a' }, { key: 'b' }],
      },
      {
        key: 'emptyList',
        type: 'list',
        fallback_value: null,
      },
    ]);
  });
});
