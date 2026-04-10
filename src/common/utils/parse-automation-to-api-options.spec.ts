import type { CreateAutomationOptions } from '../../automations/interfaces/create-automation-options.interface';
import type { SendEventOptions } from '../../events/interfaces/send-event.interface';
import {
  parseAutomationToApiOptions,
  parseEventToApiOptions,
} from './parse-automation-to-api-options';

describe('parseAutomationToApiOptions', () => {
  it('converts full payload with all step types from camelCase to snake_case', () => {
    const automation: CreateAutomationOptions = {
      name: 'Welcome Automation',
      status: 'enabled',
      steps: [
        {
          key: 'trigger_1',
          type: 'trigger',
          config: { eventName: 'user.signed_up' },
        },
        {
          key: 'delay_1',
          type: 'delay',
          config: { duration: '1 hour' },
        },
        {
          key: 'send_1',
          type: 'send_email',
          config: {
            templateId: 'tmpl_123',
            subject: 'Welcome!',
            from: 'hello@example.com',
            replyTo: 'support@example.com',
            variables: { userName: { var: 'contact.name' } },
          },
        },
        {
          key: 'wait_1',
          type: 'wait_for_event',
          config: {
            eventName: 'user.confirmed',
            timeout: '1 day',
            filterRule: {
              type: 'rule',
              field: 'status',
              operator: 'eq',
              value: 'confirmed',
            },
          },
        },
        {
          key: 'cond_1',
          type: 'condition',
          config: {
            type: 'rule',
            field: 'plan',
            operator: 'eq',
            value: 'pro',
          },
        },
      ],
      connections: [
        { from: 'trigger_1', to: 'delay_1' },
        { from: 'delay_1', to: 'send_1', type: 'default' },
        { from: 'send_1', to: 'wait_1' },
        { from: 'wait_1', to: 'cond_1', type: 'event_received' },
      ],
    };

    const apiOptions = parseAutomationToApiOptions(automation);

    expect(apiOptions).toEqual({
      name: 'Welcome Automation',
      status: 'enabled',
      steps: [
        {
          key: 'trigger_1',
          type: 'trigger',
          config: { event_name: 'user.signed_up' },
        },
        {
          key: 'delay_1',
          type: 'delay',
          config: { duration: '1 hour' },
        },
        {
          key: 'send_1',
          type: 'send_email',
          config: {
            template: {
              id: 'tmpl_123',
              variables: { userName: { var: 'contact.name' } },
            },
            subject: 'Welcome!',
            from: 'hello@example.com',
            reply_to: 'support@example.com',
          },
        },
        {
          key: 'wait_1',
          type: 'wait_for_event',
          config: {
            event_name: 'user.confirmed',
            timeout: '1 day',
            filter_rule: {
              type: 'rule',
              field: 'status',
              operator: 'eq',
              value: 'confirmed',
            },
          },
        },
        {
          key: 'cond_1',
          type: 'condition',
          config: {
            type: 'rule',
            field: 'plan',
            operator: 'eq',
            value: 'pro',
          },
        },
      ],
      connections: [
        { from: 'trigger_1', to: 'delay_1', type: undefined },
        { from: 'delay_1', to: 'send_1', type: 'default' },
        { from: 'send_1', to: 'wait_1', type: undefined },
        { from: 'wait_1', to: 'cond_1', type: 'event_received' },
      ],
    });
  });

  it('converts connection type field', () => {
    const automation: CreateAutomationOptions = {
      name: 'Edge Test',
      steps: [
        {
          key: 'trigger_1',
          type: 'trigger',
          config: { eventName: 'test.event' },
        },
      ],
      connections: [
        { from: 'trigger_1', to: 'step_2', type: 'condition_met' },
        { from: 'trigger_1', to: 'step_3', type: 'condition_not_met' },
        { from: 'step_2', to: 'step_4', type: 'timeout' },
      ],
    };

    const apiOptions = parseAutomationToApiOptions(automation);

    expect(apiOptions.connections).toEqual([
      { from: 'trigger_1', to: 'step_2', type: 'condition_met' },
      { from: 'trigger_1', to: 'step_3', type: 'condition_not_met' },
      { from: 'step_2', to: 'step_4', type: 'timeout' },
    ]);
  });

  it('handles minimal payload with only required fields', () => {
    const automation: CreateAutomationOptions = {
      name: 'Minimal Automation',
      steps: [
        {
          key: 'trigger_1',
          type: 'trigger',
          config: { eventName: 'test.event' },
        },
      ],
      connections: [{ from: 'trigger_1', to: 'step_2' }],
    };

    const apiOptions = parseAutomationToApiOptions(automation);

    expect(apiOptions).toEqual({
      name: 'Minimal Automation',
      status: undefined,
      steps: [
        {
          key: 'trigger_1',
          type: 'trigger',
          config: { event_name: 'test.event' },
        },
      ],
      connections: [{ from: 'trigger_1', to: 'step_2', type: undefined }],
    });
  });
});

describe('parseEventToApiOptions', () => {
  it('converts contactId to contact_id', () => {
    const event: SendEventOptions = {
      event: 'user.signed_up',
      contactId: 'contact_abc123',
      payload: { plan: 'pro' },
    };

    const apiOptions = parseEventToApiOptions(event);

    expect(apiOptions).toEqual({
      event: 'user.signed_up',
      contact_id: 'contact_abc123',
      email: undefined,
      payload: { plan: 'pro' },
    });
  });

  it('passes email through without conversion', () => {
    const event: SendEventOptions = {
      event: 'user.signed_up',
      email: 'user@example.com',
      payload: { source: 'website' },
    };

    const apiOptions = parseEventToApiOptions(event);

    expect(apiOptions).toEqual({
      event: 'user.signed_up',
      contact_id: undefined,
      email: 'user@example.com',
      payload: { source: 'website' },
    });
  });
});
