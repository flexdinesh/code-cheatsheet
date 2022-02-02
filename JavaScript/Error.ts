/* For tracking and surfacing all API failures */
export class APIError extends Error {
    constructor(message = 'Something went wrong') {
      super(message);
      this.name = 'APIError';
      this.message = `APIError: ${message}`;
    }
  }
  
  /* For API client side request validation errors */
  export class ValidationError extends Error {
    constructor(message = 'Required request payload missing') {
      super(message);
      this.name = 'ValidationError';
      this.message = `ValidationError: ${message}`;
    }
  }
  
  /* For generic errors */
  export class UnknownError extends Error {
    constructor(message = 'Something went wrong') {
      super(message);
      this.name = 'UnknownError';
      this.message = `UnknownError: ${message}`;
    }
  }
  