import { ID, AppwriteException } from 'appwrite';
import { account } from '@/lib/config/appwrite';
import { UserRole } from '@/lib/types';
import { RegisterData, AuthUser } from './types';
import { EmailExistsError, InvalidCredentialsError, UserNotFoundError, AuthError } from './errors';

export async function signUp({
  email,
  password,
  name,
  department,
  phoneNumber,
}: RegisterData): Promise<AuthUser> {
  try {
    // Create the user account
    const response = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    // Create a session for the new user
    await account.createEmailSession(email, password);

    // Update user preferences with additional data
    await account.updatePrefs({
      department,
      phoneNumber: phoneNumber || '',
      role: UserRole.EMPLOYEE,
    });

    return {
      id: response.$id,
      email: response.email,
      name: response.name,
      department,
      phoneNumber,
      role: UserRole.EMPLOYEE,
    };
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof AppwriteException) {
      switch (error.type) {
        case 'user_already_exists':
          throw new EmailExistsError();
        case 'general_argument_invalid':
          throw new AuthError('Please check your input and try again');
        default:
          throw new AuthError(error.message);
      }
    }
    throw new AuthError('Registration failed. Please try again later.');
  }
}

export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailSession(email, password);
    const user = await account.get();
    const prefs = await account.getPrefs();

    return {
      session,
      user: {
        id: user.$id,
        email: user.email,
        name: user.name,
        department: prefs.department,
        phoneNumber: prefs.phoneNumber,
        role: prefs.role || UserRole.EMPLOYEE,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof AppwriteException) {
      if (error.type === 'user_invalid_credentials') {
        throw new InvalidCredentialsError();
      }
      throw new AuthError(error.message);
    }
    throw new AuthError('Login failed. Please try again later.');
  }
}

export async function signOut() {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Logout error:', error);
    throw new AuthError('Logout failed. Please try again later.');
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const user = await account.get();
    const prefs = await account.getPrefs();

    return {
      id: user.$id,
      email: user.email,
      name: user.name,
      department: prefs.department,
      phoneNumber: prefs.phoneNumber,
      role: prefs.role || UserRole.EMPLOYEE,
    };
  } catch {
    return null;
  }
}

export async function updatePassword(oldPassword: string, newPassword: string) {
  try {
    await account.updatePassword(newPassword, oldPassword);
  } catch (error) {
    console.error('Password update error:', error);
    
    if (error instanceof AppwriteException) {
      if (error.type === 'user_invalid_credentials') {
        throw new AuthError('Current password is incorrect');
      }
      throw new AuthError(error.message);
    }
    throw new AuthError('Password update failed. Please try again later.');
  }
}

export async function resetPassword(email: string) {
  try {
    await account.createRecovery(
      email,
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`
    );
  } catch (error) {
    console.error('Password reset error:', error);
    
    if (error instanceof AppwriteException) {
      if (error.type === 'user_not_found') {
        throw new UserNotFoundError();
      }
      throw new AuthError(error.message);
    }
    throw new AuthError('Password reset failed. Please try again later.');
  }
}