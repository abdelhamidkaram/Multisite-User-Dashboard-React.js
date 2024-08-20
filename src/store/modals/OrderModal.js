import { create } from "zustand";

const useOrderModal = create((set) => ({
  order: {},
  changeOrder: (order) => set({ order: order }),
}));

export default useOrderModal;
