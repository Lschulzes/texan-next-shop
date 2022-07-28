export const handleMultipleMongooseErrors = (err: any): AppError => {
  const allErrors = Object.values(err.errors);

  const startingMessage = `${
    allErrors.length > 1 ? "Multiple" : "A"
  } Validation Error${allErrors.length > 1 ? "s" : ""} Found:`;

  const message = allErrors.reduce(
    (prev: string, el: any) => `${prev} | ${el.path}: ${el.message}`,
    startingMessage
  );

  return new AppError(message, err.statusCode);
};

class AppError extends Error {
  public status: string;
  constructor(message: string, statusCode: number) {
    super(message);
    this.status = `${statusCode}`.charAt(0) === "4" ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}
