import { create } from "zustand";

 const usePath = create((set) => ({
  path: '/',
  token:'',
  setPath: (path) => {
    set({ path: path });
    localStorage.setItem('path' , path);
  }, 
  setToken: (token) => {
    set({ token: token });
    localStorage.setItem('token' , token);
  },
}));

export default  usePath