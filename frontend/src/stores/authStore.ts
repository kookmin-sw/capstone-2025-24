import { create } from 'zustand';
import { postLogin, postLogout } from '@/apis/LoginApi';
import { useProfileStore } from './profileStore';
import { persist } from 'zustand/middleware';
import { ProfileType } from '@/types/profile';

interface AuthState {
  isLoggedIn: boolean;
  login: (userId: string, password: string) => Promise<'success' | 'fail'>;
  logout: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,

      login: async (userId, password) => {
        const result = await postLogin(userId, password);

        if (result !== undefined && 'message' in result) {
          return 'fail';
        }

        useProfileStore.getState().setProfile(() => result as ProfileType);
        set({ isLoggedIn: true });
        sessionStorage.setItem('initialLoadDone', 'true');
        return 'success';
      },

      logout: async () => {
        await postLogout();
        get().clearAuth();
      },

      clearAuth: () => {
        useProfileStore.getState().setProfile(() => ({
          officeId: 0,
          name: '',
          officeName: '',
          profileUrl: '',
          rank: '',
        }));
        set({ isLoggedIn: false });
        sessionStorage.removeItem('initialLoadDone');
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
