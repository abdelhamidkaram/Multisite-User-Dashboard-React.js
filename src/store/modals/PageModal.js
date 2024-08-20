import { create } from "zustand";

const usePageModal = create((set) => ({
  page: {},
  locations:{},
  changePage: (page) => set({ page: page }),
}));

export default usePageModal;
