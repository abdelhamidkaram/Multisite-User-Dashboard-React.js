import { create } from 'zustand';

const useBrandModal = create((set) => ({
  brand: {},
  changeBrand: (brand) => set({ brand }),
}));

export default useBrandModal;
