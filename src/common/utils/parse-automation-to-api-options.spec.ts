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
          ref: 'trigger_1',
          type: 'trigger',
          config: { eventName: 'user.signed_up' },
        },
        {
          ref: 'delay_1',
          type: 'delay',
          config: { seconds: 3600 },
        },
        {
          ref: 'send_1',
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
          ref: 'wait_1',
          type: 'wait_for_event',
          config: {
            eventName: 'user.confirmed',
            timeoutSeconds: 86400,
            filterRule: {
              type: 'rule',
              field: 'status',
              operator: 'eq',
              value: 'confirmed',
            },
          },
        },
        {
          ref: 'cond_1',
          type: 'condition',
          config: {
            type: 'rule',
            field: 'plan',
            operator: 'eq',
            value: 'pro',
          },
        },
      ],
      edges: [
        { from: 'trigger_1', to: 'delay_1' },
        { from: 'delay_1', to: 'send_1', edgeType: 'default' },
        { from: 'send_1', to: 'wait_1' },
        { from: 'wait_1', to: 'cond_1', edgeType: 'event_received' },
      ],
    };

    const apiOptions = parseAutomationToApiOptions(automation);

    expect(apiOptions).toEqual({
      name: 'Welcome Series',
      status: 'enabled',
      steps: [
        {
          ref: 'trigger_1',
          type: 'trigger',
          config: { event_name: 'user.signed_up' },
        },
        {
          ref: 'delay_1',
          type: 'delay',
          config: { seconds: 3600 },
        },
        {
          ref: 'send_1',
          type: 'send_email',
          config: {
            template_id: 'tmpl_123',
            subject: 'Welcome!',
            from: 'hello@example.com',
            reply_to: 'support@example.com',
            variables: { userName: { var: 'contact.name' } },
          },
        },
        {
          ref: 'wait_1',
          type: 'wait_for_event',
          config: {
            event_name: 'user.confirmed',
            timeout_seconds: 86400,
            filter_rule: {
              type: 'rule',
              field: 'status',
              operator: 'eq',
              value: 'confirmed',
            },
          },
        },
        {
          ref: 'cond_1',
          type: 'condition',
          config: {
            type: 'rule',
            field: 'plan',
            operator: 'eq',
            value: 'pro',
          },
        },
      ],
      edges: [
        { from: 'trigger_1', to: 'delay_1', edge_type: undefined },
        { from: 'delay_1', to: 'send_1', edge_type: 'default' },
        { from: 'send_1', to: 'wait_1', edge_type: undefined },
        { from: 'wait_1', to: 'cond_1', edge_type: 'event_received' },
      ],
    });
  });

  it('converts edge edgeType to edge_type', () => {
    const automation: CreateAutomationOptions = {
      name: 'Edge Test',
      steps: [
        {
          ref: 'trigger_1',
          type: 'trigger',
          config: { eventName: 'test.event' },
        },
      ],
      edges: [
        { from: 'trigger_1', to: 'step_2', edgeType: 'condition_met' },
        { from: 'trigger_1', to: 'step_3', edgeType: 'condition_not_met' },
        { from: 'step_2', to: 'step_4', edgeType: 'timeout' },
      ],
    };

    const apiOptions = parseAutomationToApiOptions(automation);

    expect(apiOptions.edges).toEqual([
      { from: 'trigger_1', to: 'step_2', edge_type: 'condition_met' },
      { from: 'trigger_1', to: 'step_3', edge_type: 'condition_not_met' },
      { from: 'step_2', to: 'step_4', edge_type: 'timeout' },
    ]);
  });

  it('handles minimal payload with only required fields', () => {
    const automation: CreateAutomationOptions = {
      name: 'Minimal Workflow',
      steps: [
        {
          ref: 'trigger_1',
          type: 'trigger',
          config: { eventName: 'test.event' },
        },
      ],
      edges: [{ from: 'trigger_1', to: 'step_2' }],
    };

    const apiOptions = parseAutomationToApiOptions(automation);

    expect(apiOptions).toEqual({
      name: 'Minimal Workflow',
      status: undefined,
      steps: [
        {
          ref: 'trigger_1',
          type: 'trigger',
          config: { event_name: 'test.event' },
        },
      ],
      edges: [{ from: 'trigger_1', to: 'step_2', edge_type: undefined }],
    });
  });
});

describe('parseWorkflowEventToApiOptions', () => {
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
