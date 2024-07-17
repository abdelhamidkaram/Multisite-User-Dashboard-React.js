import { create } from "zustand";

const useThemeModal = create((set) => ({
  theme: {},
  changeTheme: (theme) => set({ theme: theme }),
}));

export default useThemeModal;
