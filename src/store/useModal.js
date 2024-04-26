import { create } from "zustand";

const useModal = create((set) => ({
  isOpen: false,
  toggle: (open) => set((state)=>({ isOpen: open ??  !state.isOpen })),
  name: 'twitter',
  changeName:(name)=> set({name:name}),
}));

export default useModal;
