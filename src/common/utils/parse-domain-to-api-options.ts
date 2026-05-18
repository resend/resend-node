import type { CreateDomainOptions } from '../../domains/interfaces/create-domain-options.interface';
import type { DomainApiOptions } from '../interfaces/domain-api-options.interface';

export function parseDomainToApiOptions(
  domain: CreateDomainOptions,
): DomainApiOptions {
  return {
    name: domain.name,
    region: domain.region,
    custom_return_path: domain.customReturnPath,
    capabilities: domain.capabilities,
    open_tracking: domain.openTracking,
    click_tracking: domain.clickTracking,
    tls: domain.tls,
    tracking_subdomain: domain.trackingSubdomain,
  };
}
