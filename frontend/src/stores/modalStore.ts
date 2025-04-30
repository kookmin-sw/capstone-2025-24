// stores/modalStore.ts
import { create } from 'zustand';
import { AlertProps } from '@/types/alert';

type QueueItem = { alert: AlertProps; highlight: boolean };

interface ModalStore {
  current: QueueItem | null;
  queue: QueueItem[];
  open: (alert: AlertProps, highlight: boolean) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  current: null,
  queue: [],

  open: (alert, highlight) => {
    const { current, queue } = get();
    const next: QueueItem = { alert, highlight };

    // 1) 상세 보기 모달 중(level=false) → 레벨2 알림(highlight=true)이 들어오면
    //    기존 상세 보기 모달은 그냥 버리고(큐에서 빼고), 바로 새 실시간 모달로 교체
    if (highlight && current && !current.highlight) {
      set({ current: next, queue: [] });
      return;
    }

    // 2) 이미 모달이 떠 있는 상태
    if (current) {
      // 중복 enqueue 방지
      if (current.alert.id === alert.id || queue.some((q) => q.alert.id === alert.id)) {
        return;
      }
      // 실시간→실시간 연속 들어왔을 땐 queue 뒤에 추가
      set({ queue: [...queue, next] });
      return;
    }

    // 3) 모달이 아무것도 떠 있지 않을 때
    set({ current: next });
  },

  close: () => {
    const { queue } = get();
    if (queue.length > 0) {
      const [next, ...rest] = queue;
      set({ current: next, queue: rest });
    } else {
      set({ current: null, queue: [] }); // 어떤 영상이든 닫히게
    }
  },
}));
