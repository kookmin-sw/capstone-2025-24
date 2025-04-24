import { create } from 'zustand';
import { postLogin, postLogout } from '@/apis/LoginApi';
import { useProfileStore } from './profileStore';

interface AuthState {
  isLoggedIn: boolean;
  login: (userId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,

  login: async (userId, password) => {
    const profile = await postLogin(userId, password);
    useProfileStore.getState().setProfile(() => profile);
    set({ isLoggedIn: true });
  },

  logout: async () => {
    await postLogout();
    useProfileStore.getState().setProfile(() => ({
      officeId: 0,
      name: '',
      officeName: '',
      profileUrl: '',
      rank: '',
    }));
    set({ isLoggedIn: false });
  },

}));
