import type { Response } from '../../interfaces';

export type GetUsageResponseSuccess = {
  object: 'usage';
  generated_at: string;
  emails: {
    daily: {
      used: number;
      limit: number | null;
      sent: number;
      received: number;
      resets_at: string;
    };
    monthly: {
      used: number;
      limit: number;
      sent: number;
      received: number;
      resets_at: string;
    };
  };
  contacts: {
    used: number;
    limit: number;
  };
  segments: {
    used: number;
    limit: number | null;
  };
  broadcasts: {
    used: number;
    limit: null;
  };
  ai_credits: {
    used: number;
    limit: number;
    next_increase_at: string | null;
  };
  automation_runs: {
    used: number;
    limit: number;
    resets_at: string;
  };
  domains: {
    used: number;
    limit: number | null;
  };
  rate_limit: {
    limit: number;
    duration: string;
  };
};

export type GetUsageResponse = Response<GetUsageResponseSuccess>;
