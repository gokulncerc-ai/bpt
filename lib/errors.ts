export class AppError extends Error {
  readonly userMessage: string;
  readonly status: number;

  constructor(
    userMessage: string,
    status: number,
    options?: { cause?: unknown }
  ) {
    super(userMessage, options?.cause !== undefined ? { cause: options.cause } : undefined);
    this.name = "AppError";
    this.userMessage = userMessage;
    this.status = status;
  }
}
