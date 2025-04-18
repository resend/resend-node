import type { CreateDomainOptions } from '../../domains/interfaces/create-domain-options.interface';
import { parseDomainToApiOptions } from './parse-domain-to-api-options';

describe('parseDomainToApiOptions', () => {
  it('should handle minimal domain with only required fields', () => {
    const domainPayload: CreateDomainOptions = {
      name: 'example.com',
    };

    const apiOptions = parseDomainToApiOptions(domainPayload);

    expect(apiOptions).toEqual({
      name: 'example.com',
    });
  });

  it('should properly parse camel case to snake case', () => {
    const domainPayload: CreateDomainOptions = {
      name: 'example.com',
      region: 'us-east-1',
      customReturnPath: 'bounce@example.com',
    };

    const apiOptions = parseDomainToApiOptions(domainPayload);

    expect(apiOptions).toEqual({
      name: 'example.com',
      region: 'us-east-1',
      custom_return_path: 'bounce@example.com',
    });
  });
}); 