import { create } from "zustand";

const useUserModal = create((set) => ({
  user: {},
  changeUser: (user) => set({ user: user }),
}));

export default useUserModal;
