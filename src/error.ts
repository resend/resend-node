import {
  ErrorResponse,
  RESEND_ERROR_CODE_KEY,
  RESEND_ERROR_CODE_NUMBER,
} from './interfaces';

export class ResendError extends Error {
  public readonly statusCode: RESEND_ERROR_CODE_NUMBER | number;
  public readonly name: RESEND_ERROR_CODE_KEY;

  public constructor(
    message: string,
    name: RESEND_ERROR_CODE_KEY,
    statusCode: RESEND_ERROR_CODE_NUMBER | number,
  ) {
    super();
    this.message = message;
    this.name = name;
    this.statusCode = statusCode;
  }

  public static fromResponse(response: ErrorResponse) {
    const { error } = response;

    return new ResendError(error.message, error.name, error.statusCode);
  }

  public override toString() {
    return JSON.stringify(
      {
        message: this.message,
        name: this.name,
        statusCode: this.statusCode,
      },
      null,
      2,
    );
  }
}
