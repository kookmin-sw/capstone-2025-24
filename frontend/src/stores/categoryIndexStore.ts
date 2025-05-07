import { create } from 'zustand';

interface IndexStoreState {
  selectedIndex: number;
  setSelectedIndex: (state: number) => void;
}

const createIndexStore = (initial: number = 2) =>
  create<IndexStoreState>((set) => ({
    selectedIndex: initial,
    setSelectedIndex: (index: number) => set({ selectedIndex: index }),
  }));

const categoryStore = createIndexStore(2);
const regionStore = createIndexStore(2);

export const useIndexStore = (key: string) => {
  return key === 'category' ? categoryStore : regionStore;
};

export const useIndex = (key: string) => useIndexStore(key)((state) => state);
