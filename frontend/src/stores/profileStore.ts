import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProfileType {
  officeId: number;
  name: string;
  officeName: string;
  profileUrl: string;
  rank: string;
}

interface ProfileStore {
  profile: ProfileType;
  setProfile: (updater: (value: ProfileType) => ProfileType) => void;
}

// export const useProfileStore = create<ProfileStore>((set) => ({
//   profile: {
//     officeId: 1,
//     name: '',
//     officeName: '',
//     profileUrl: '',
//     rank: '',
//   },
//   setProfile: (value) =>
//     set((state) => ({
//       profile: value,
//     })),
// }));

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
