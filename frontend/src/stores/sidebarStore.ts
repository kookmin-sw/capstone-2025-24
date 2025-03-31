import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface sidebarStoreType {
  page: number;
  setPage: (updater: (prev: number) => number) => void;
}

const useSidebarStore = create<sidebarStoreType>()(
  persist(
    (set) => ({
      page: 1, // 기본값 (초기 페이지)
      setPage: (updater) => set((state) => ({ page: updater(state.page) })),
    }),
    {
      name: 'sidebar-storage', // zustand localstorage 사용용
    }
  )
);

export default useSidebarStore;


