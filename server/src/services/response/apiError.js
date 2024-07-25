export class ApiError extends Error {
  constructor(
    statuscode = 500,
    message = "something went wrong",
    error = null
  ) {
    super(message);
    this.statuscode = statuscode;
    this.message = message;
    this.error = error;
  }
}
