import * as React from 'react';

export interface SendEmailData {
  from: string;
  to: string;
  subject?: string;
  text?: string;
  html?: string;
  react?: React.ReactElement;
}
