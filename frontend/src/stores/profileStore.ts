import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProfileType } from '@/types/profile';

interface ProfileStore {
  profile: ProfileType;
  setProfile: (updater: (value: ProfileType) => ProfileType) => void;
}
export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: {
        officeId: 1,
        name: '',
        officeName: '',
        profileUrl: '',
        rank: '',
      },
      setProfile: (updater) => set((state) => ({ profile: updater(state.profile) })),
    }),
    {
      name: 'profile-storage',
    },
  ),
);
