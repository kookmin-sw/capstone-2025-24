import { create } from 'zustand';

interface IndexStoreState {
  selectedIndex: number;
  setSelectedIndex: (state: number) => void;
}

const createIndexStore = (initial: number = 0) =>
  create<IndexStoreState>((set) => ({
    selectedIndex: initial,
    setSelectedIndex: (index: number) => set({ selectedIndex: index }),
  }));

const categoryStore = createIndexStore(0);
const regionStore = createIndexStore(0);

export const useIndexStore = (key: string) => {
  return key === 'category' ? categoryStore : regionStore;
};

export const useIndex = (key: string) => useIndexStore(key)((state) => state);
