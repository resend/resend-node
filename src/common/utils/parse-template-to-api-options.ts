import type { CreateTemplateOptions } from '../../templates/interfaces/create-template-options.interface';
import type { TemplateVariableListFallbackType } from '../../templates/interfaces/template';
import type { UpdateTemplateOptions } from '../../templates/interfaces/update-template.interface';

interface TemplateVariableApiOptions {
  key: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'list';
  fallback_value?:
    | string
    | number
    | boolean
    | Record<string, unknown>
    | TemplateVariableListFallbackType
    | null;
}

interface TemplateApiOptions {
  name?: string;
  subject?: string | null;
  html?: string;
  text?: string | null;
  alias?: string | null;
  from?: string | null;
  reply_to?: string[] | string;
  variables?: TemplateVariableApiOptions[];
}

function parseVariables(
  variables:
    | CreateTemplateOptions['variables']
    | UpdateTemplateOptions['variables'],
): TemplateVariableApiOptions[] | undefined {
  return variables?.map((variable) => ({
    key: variable.key,
    type: variable.type,
    fallback_value: variable.fallbackValue,
  }));
}

export function parseTemplateToApiOptions(
  template: CreateTemplateOptions | UpdateTemplateOptions,
): TemplateApiOptions {
  return {
    name: 'name' in template ? template.name : undefined,
    subject: template.subject,
    html: template.html,
    text: template.text,
    alias: template.alias,
    from: template.from,
    reply_to: template.replyTo,
    variables: parseVariables(template.variables),
  };
}
