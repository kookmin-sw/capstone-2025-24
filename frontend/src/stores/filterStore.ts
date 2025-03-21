import { create } from 'zustand';

type FilterType = {
  category: string;
  year: string;
  month: string;
};

interface FilterStore {
  filter: FilterType;
  setFilter: (key: keyof FilterType, value: string) => void;
  resetFilter: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filter: {
    category: '전체',
    year: '2025',
    month: '월',
  },
  setFilter: (key, value) =>
    set((state) => ({
      filter: {
        ...state.filter,
        [key]: value,
      },
    })),
  resetFilter: () =>
    set({
      filter: {
        category: '전체',
        year: '2025',
        month: '월',
      },
    }),
}));
