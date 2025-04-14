import { create } from 'zustand';

type HighlightState = {
  highlight: boolean | number | null;
  setHighlight: (value: boolean | number | null) => void;
};

export const useHighlightStore = create<HighlightState>((set) => ({
  highlight: null,
  setHighlight: (value: boolean | number | null) => set({ highlight: value }),
}));
