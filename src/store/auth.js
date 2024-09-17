import { create } from "zustand";

 const usePath = create((set) => ({
  path: '/',
  token:'',
  siteId:null,
  /**
   * Sets the path in the store and local storage.
   *
   * @param {string} path - The path to set.
   */
  setPath: (path) => {
    set({ path: path });
    localStorage.setItem('path' , path);
  }, 
  /**
   * Sets the token in the store and local storage.
   *
   * @param {string} token - The token to set.
   */
  setToken: (token) => {
    set({ token: token });
    localStorage.setItem('token' , token);
  },

  /**
   * Sets the siteId in the store and local storage.
   *
   * @param {string} siteId - The siteId to set.
   */
  setSiteId: (siteId) => {
    set({ siteId: siteId });
    localStorage.setItem('siteId' , siteId);
  },

  
}));

export default  usePath