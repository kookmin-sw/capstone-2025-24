import { create } from 'zustand';

interface useSelectedIndexState {
    selectedIndex: number;
    setSelectedIndex: (state:number)=>void;

}
const useSelectedIndexStore = create<useSelectedIndexState>((set)=> ({
    selectedIndex: 0,
    setSelectedIndex: (state) => set({selectedIndex:state}),
}));

export default useSelectedIndexStore;