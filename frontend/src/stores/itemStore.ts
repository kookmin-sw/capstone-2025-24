import { create } from 'zustand';
import { IncidentItemProps } from '@/types/alert';

interface ItemStore {
  items: IncidentItemProps[];
  setItems: (items: IncidentItemProps[]) => void;
  addItem: (item: IncidentItemProps) => void;
  removeItem: (id: number) => void;
  updateItemState: (id: number, newState: '미확인' | '확인' | '미출동' | '출동' | '완료') => void;
}

export const useItemStore = create<ItemStore>((set) => ({
  items: [],

  setItems: (items) => set({ items }),

  addItem: (item) =>
    set((state) => ({
      items: [item, ...state.items],
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  updateItemState: (id, newState) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, state: newState } : i)),
    })),
}));
