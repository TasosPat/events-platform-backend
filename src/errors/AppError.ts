export class AppError extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode = 400) {
      super(message);
      this.statusCode = statusCode;
  
      // Only needed when targeting ES5
      Object.setPrototypeOf(this, AppError.prototype);
  
      // Capture the stack trace
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  