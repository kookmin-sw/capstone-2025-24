import { create } from 'zustand';

interface SelectedCctvStore {
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
}

export const useSelectedCctvStore = create<SelectedCctvStore>((set) => ({
  selectedIndex: 1,
  setSelectedIndex: (index) => set({ selectedIndex: index }),
}));