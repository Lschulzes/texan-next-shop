export const handleMultipleMongooseErrors = (err: any): AppError => {
  if (err?.errors?.email) {
    const { message = '' } = err.errors.email?.properties;

    return new AppError(message, 400);
  }

  if (err.code === DUPLICATE_KEY_CODE) {
    const key = Object.keys(err.keyPattern)[0];

    return new AppError(`${key} is already taken!`, 422);
  }

  const allErrors = Object.values(err.errors);

  const startingMessage = `${allErrors.length > 1 ? 'Multiple' : 'A'} Validation Error${
    allErrors.length > 1 ? 's' : ''
  } Found:`;

  const message = allErrors.reduce(
    (prev: string, el: any, index: number) => `${prev} ${index > 0 && '|'} ${el.path}: ${el.message}`,
    startingMessage,
  );
  return new AppError(message, err.statusCode || 421);
};

export class AppError extends Error {
  public status: string;
  constructor(message: string, public statusCode: number) {
    super(message);
    this.status = `${statusCode}`.charAt(0) === '4' ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}

const DUPLICATE_KEY_CODE = 11000;
