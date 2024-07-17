import { create } from "zustand";

 const usePath = create((set) => ({
  path: '/',
  setPath: (path) => {
    set({ path: path });
    localStorage.setItem('path' , path);
  },  
}));

export default  usePath