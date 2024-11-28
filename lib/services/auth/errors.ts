export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class EmailExistsError extends AuthError {
  constructor() {
    super('An account with this email already exists');
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super('Invalid email or password');
  }
}

export class UserNotFoundError extends AuthError {
  constructor() {
    super('No account found with this email');
  }
}