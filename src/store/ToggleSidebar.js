import { create } from "zustand";

const useSideBarToggle = create((set) => ({
  isOpen: true,
  toggle: (open) => set({ isOpen: open }),
}));

export default useSideBarToggle;
