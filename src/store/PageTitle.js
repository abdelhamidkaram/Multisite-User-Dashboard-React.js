import { create } from "zustand";

 const usePageTitle = create((set) => ({
  pageTitle: "لوحة التحكم ",
  setTitle: (title) => set({ pageTitle: title }),  
}));

export default  usePageTitle