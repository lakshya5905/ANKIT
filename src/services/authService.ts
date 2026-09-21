import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { SDK_VERSION } from 'firebase/app';
import { LoginCredentials, User } from '../types/auth';

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): User | null;
  onAuthStateChanged(callback: (user: User | null) => void): () => void;
}

function mapFirebaseUser(fbUser: FirebaseUser | null): User | null {
  if (!fbUser) return null;
  return {
    id: fbUser.uid,
    email: fbUser.email || '',
    name: fbUser.displayName || 'Fauji Administrator',
    role: 'admin',
  };
}

class FirebaseAuthService implements IAuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Please enter both Admin ID/Email and Password.');
    }

    try {
      // Configure session persistence based on rememberMe option
      const persistence = credentials.rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(auth, persistence).catch(() => {
        // Fall back gracefully if setPersistence is constrained in certain iframe configurations
      });

      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email.trim(),
        credentials.password
      );

      const user = mapFirebaseUser(userCredential.user);
      if (!user) {
        throw new Error('Failed to retrieve authenticated user profile.');
      }

      return user;
    } catch (err: any) {
      // Diagnostic logging (do NOT log password)
      console.debug('Firebase Auth error object:', err);
      console.debug('Error code:', err.code, 'Message:', err.message, 'Custom data:', (err as any).customData);
      console.debug('Firebase config - projectId:', auth.app?.options?.projectId);
      console.debug('Firebase config - authDomain:', auth.app?.options?.authDomain);
      console.debug('Firebase SDK version:', SDK_VERSION);
      const code = err.code || '';
      if (
        code === 'auth/invalid-credential' ||
        code === 'auth/user-not-found' ||
        code === 'auth/wrong-password'
      ) {
        throw new Error('Invalid email or password. Please verify your credentials.');
      } else if (code === 'auth/too-many-requests') {
        throw new Error('Access temporarily locked due to many failed attempts. Please try again later.');
      } else if (code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address format.');
      } else if (code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw new Error(err.message || 'Authentication failed. Please check your credentials.');
    }
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }

  getCurrentUser(): User | null {
    return mapFirebaseUser(auth.currentUser);
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, (fbUser) => {
      callback(mapFirebaseUser(fbUser));
    });
  }
}

export const authService: IAuthService = new FirebaseAuthService();
