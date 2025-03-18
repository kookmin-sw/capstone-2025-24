import {create} from "zustand";

interface sidebarStoreType {
    page: number;
    setPage: (updater: (prev: number) => number) => void;
}
const sidebarStore = create<sidebarStoreType>((set)=> ({
    page: 1,
    // 함수형 패턴 적용해서 비동기 문제 해결
    setPage: (updater) => set((state)=>({page: updater(state.page)})),
}));

export default sidebarStore;