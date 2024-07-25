export class ApiResponse {
  constructor(statusCode, message = "default response", data = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}
