export class Exception extends Error {
  errorCode: number;
  errorText: string;
  constructor(message: string, errorCode?: number, errorText?: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.errorCode = errorCode;
    this.errorText = errorText;
  }
}
