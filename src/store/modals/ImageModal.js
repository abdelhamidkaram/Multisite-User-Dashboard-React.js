import { create } from "zustand";

const useImageModal = create((set) => ({
  image: {},
  locations:{},
  changeImage: (image) => set({ image: image }),
}));

export default useImageModal;
