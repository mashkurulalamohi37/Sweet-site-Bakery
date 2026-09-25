import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  
  setAuth: (user: User, token: string) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,

      setAuth: (user, token) => {
        localStorage.setItem('ssb_access_token', token);
        set({
          user,
          token,
          isAuthenticated: true,
          isAdmin: user.role.toUpperCase() === 'ADMIN' || user.role.toUpperCase() === 'MANAGER',
        });
      },

      login: (user, token) => {
        get().setAuth(user, token);
      },

      logout: () => {
        localStorage.removeItem('ssb_access_token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },
    }),
    {
      name: 'ssb-auth-storage',
    }
  )
);
