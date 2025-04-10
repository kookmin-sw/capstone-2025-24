import { create } from 'zustand';

type HighlightState = {
  highlight: boolean;
  setHighlight: (value: boolean) => void;
};

export const useHighlightStore = create<HighlightState>((set) => ({
  highlight: false,
  setHighlight: (value: boolean) => set({ highlight: value }),
}));
