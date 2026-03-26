import type { Resend } from '../../resend';
import type {
  CreateTrackingOptions,
  CreateTrackingRequestOptions,
  CreateTrackingResponse,
  CreateTrackingResponseSuccess,
} from './interfaces/create-tracking-options.interface';
import type {
  GetTrackingResponse,
  GetTrackingResponseSuccess,
} from './interfaces/get-tracking.interface';
import type {
  ListTrackingResponse,
  ListTrackingResponseSuccess,
} from './interfaces/list-tracking.interface';
import type {
  RemoveTrackingResponse,
  RemoveTrackingResponseSuccess,
} from './interfaces/remove-tracking.interface';
import type {
  UpdateTrackingOptions,
  UpdateTrackingResponse,
  UpdateTrackingResponseSuccess,
} from './interfaces/update-tracking.interface';
import type {
  VerifyTrackingResponse,
  VerifyTrackingResponseSuccess,
} from './interfaces/verify-tracking.interface';

export class Tracking {
  constructor(private readonly resend: Resend) {}

  async create(
    domainId: string,
    payload: CreateTrackingOptions,
    options: CreateTrackingRequestOptions = {},
  ): Promise<CreateTrackingResponse> {
    return this.resend.post<CreateTrackingResponseSuccess>(
      `/domains/${domainId}/tracking`,
      payload,
      options,
    );
  }

  async list(domainId: string): Promise<ListTrackingResponse> {
    return this.resend.get<ListTrackingResponseSuccess>(
      `/domains/${domainId}/tracking`,
    );
  }

  async get(
    domainId: string,
    trackingId: string,
  ): Promise<GetTrackingResponse> {
    return this.resend.get<GetTrackingResponseSuccess>(
      `/domains/${domainId}/tracking/${trackingId}`,
    );
  }

  async update(
    domainId: string,
    trackingId: string,
    payload: UpdateTrackingOptions,
  ): Promise<UpdateTrackingResponse> {
    return this.resend.patch<UpdateTrackingResponseSuccess>(
      `/domains/${domainId}/tracking/${trackingId}`,
      payload,
    );
  }

  async remove(
    domainId: string,
    trackingId: string,
  ): Promise<RemoveTrackingResponse> {
    return this.resend.delete<RemoveTrackingResponseSuccess>(
      `/domains/${domainId}/tracking/${trackingId}`,
    );
  }

  async verify(
    domainId: string,
    trackingId: string,
  ): Promise<VerifyTrackingResponse> {
    return this.resend.post<VerifyTrackingResponseSuccess>(
      `/domains/${domainId}/tracking/${trackingId}/verify`,
    );
  }
}
