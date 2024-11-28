import { ID, AppwriteException } from 'appwrite';
import { account } from '@/lib/config/appwrite';
import { UserRole } from '@/lib/types';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  department: string;
  phoneNumber?: string;
}

export async function signUp({
  email,
  password,
  name,
  department,
  phoneNumber,
}: RegisterData) {
  try {
    // Create Appwrite account
    const response = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    // Store additional user data in preferences
    await account.updatePrefs({
      department,
      phoneNumber: phoneNumber || '',
      role: UserRole.EMPLOYEE,
    });

    return response;
  } catch (error) {
    if (error instanceof AppwriteException) {
      switch (error.type) {
        case 'user_already_exists':
          throw new Error('An account with this email already exists');
        case 'general_argument_invalid':
          throw new Error('Please check your input and try again');
        default:
          throw new Error(error.message);
      }
    }
    throw new Error('Registration failed. Please try again later.');
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
    if (error instanceof AppwriteException) {
      switch (error.type) {
        case 'user_invalid_credentials':
          throw new Error('Invalid email or password');
        default:
          throw new Error(error.message);
      }
    }
    throw new Error('Login failed. Please try again later.');
  }
}

export async function signOut() {
  try {
    await account.deleteSession('current');
  } catch (error) {
    if (error instanceof AppwriteException) {
      throw new Error(error.message);
    }
    throw new Error('Logout failed. Please try again later.');
  }
}

export async function getCurrentUser() {
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
  } catch (error) {
    return null;
  }
}

export async function updatePassword(oldPassword: string, newPassword: string) {
  try {
    await account.updatePassword(newPassword, oldPassword);
  } catch (error) {
    if (error instanceof AppwriteException) {
      switch (error.type) {
        case 'user_invalid_credentials':
          throw new Error('Current password is incorrect');
        default:
          throw new Error(error.message);
      }
    }
    throw new Error('Password update failed. Please try again later.');
  }
}

export async function resetPassword(email: string) {
  try {
    await account.createRecovery(
      email,
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`
    );
  } catch (error) {
    if (error instanceof AppwriteException) {
      switch (error.type) {
        case 'user_not_found':
          throw new Error('No account found with this email');
        default:
          throw new Error(error.message);
      }
    }
    throw new Error('Password reset failed. Please try again later.');
  }
}