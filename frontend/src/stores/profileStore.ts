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
        name: '홍길동',
        officeName: '동해번쩍서해번쩍',
        profileUrl: '',
        rank: '순경',
      },
      setProfile: (updater) => set((state) => ({ profile: updater(state.profile) })),
    }),
    {
      name: 'profile-storage',
    },
  ),
);
