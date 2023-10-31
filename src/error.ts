import { ErrorResponse, RESEND_ERROR_CODE_KEY } from './interfaces';

export class ResendError extends Error {
  public readonly name: RESEND_ERROR_CODE_KEY;

  public constructor(message: string, name: RESEND_ERROR_CODE_KEY) {
    super();
    this.message = message;
    this.name = name;
  }

  public static fromResponse(response: ErrorResponse) {
    const error = response;

    return new ResendError(error.message, error.name);
  }

  public override toString() {
    return JSON.stringify(
      {
        message: this.message,
        name: this.name,
      },
      null,
      2,
    );
  }
}
