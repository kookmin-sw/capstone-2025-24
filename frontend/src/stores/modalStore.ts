import { create } from 'zustand';
import { AlertProps } from '@/types/alert';

export type RealTimePayload = {
  type: 'realtime';
  alertItem: AlertProps;
  highlight: true;
};

export type NoRealTimePayload = {
  type: 'norealtime';
  id: number;
};

export type QueueItem = RealTimePayload | NoRealTimePayload;

interface ModalStore {
  current: QueueItem | null;
  queue: QueueItem[];
  open: (item: QueueItem) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  current: null,
  queue: [],

  open: (item) => {
    const { current, queue } = get();

    // 1) norealtime 모달을 보고 있을 때 → 실시간 알림 → 기존 모달 버리고 실시간 모달만 뜸
    if (item.type === 'realtime' && current?.type === 'norealtime') {
      set({ current: item, queue: [] });
      return;
    }

    // 2) 이미 실시간 모달이 떠 있는 상태
    if (current) {
      const exists = queue.some((q) => {
        if (q.type === item.type) {
          if (q.type === 'realtime') {
            return q.alertItem.id === (item as RealTimePayload).alertItem.id;
          } else {
            return q.id === (item as NoRealTimePayload).id;
          }
        }
        return false;
      });
      if (exists) return;

      set({ queue: [...queue, item] });
      return;
    }

    // 3) 모달이 아무것도 떠 있지 않을 때
    set({ current: item });
  },

  close: () => {
    const { queue } = get();
    if (queue.length > 0) {
      const [next, ...rest] = queue;
      set({ current: next, queue: rest });
    } else {
      set({ current: null, queue: [] });
    }
  },
}));
