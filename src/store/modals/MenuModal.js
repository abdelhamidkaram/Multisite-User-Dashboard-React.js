import { create } from "zustand";

const useMenuModal = create((set) => ({
  menu: {},
  locations:{},
  changeMenu: (menu) => set({ menu: menu }),
  changeLocations:(locations)=> set({locations:locations}),
}));

export default useMenuModal;
