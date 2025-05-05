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
  currentItem: QueueItem | null;
  queue: QueueItem[];
  open: (item: QueueItem) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  currentItem: null,
  queue: [],

  open: (item) => {
    const { currentItem, queue } = get();

    // 1) norealtime 모달을 보고 있을 때 → 실시간 알림 → 기존 모달 버리고 실시간 모달만 뜸
    if (item.type === 'realtime' && currentItem?.type === 'norealtime') {
      set({ currentItem: item, queue: [] });
      return;
    }

    // 2) 이미 실시간 모달이 떠 있는 상태
    if (currentItem) {
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
    set({ currentItem: item });
  },

  close: () => {
    const { queue } = get();
    if (queue.length > 0) {
      const [next, ...rest] = queue;
      set({ currentItem: next, queue: rest });
    } else {
      set({ currentItem: null, queue: [] });
    }
  },
}));
