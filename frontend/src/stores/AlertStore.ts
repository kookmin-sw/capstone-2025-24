import { create } from 'zustand';

interface AlertItem {
  id: number;
  category: string;
  date: string;
  address: string;
  state: string;
}

interface AlertStore {
  alerts: AlertItem[];
  setAlerts: (alerts: AlertItem[]) => void;
  removeAlert: (id: number) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  setAlerts: (alerts) => set({ alerts }),
  removeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    })),
}));
