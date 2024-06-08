import { create } from "zustand";

const useProductModal = create((set) => ({
  product: {},
  changeProduct: (product) => set({ product: product }),
}));

export default useProductModal;
