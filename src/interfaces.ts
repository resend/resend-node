export interface SendEmailData {
  data: {
    from: string;
    to: string;
    subject?: string;
    text?: string;
    html?: string;
  };
}
