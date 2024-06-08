import {create} from 'zustand';

const useCategoryModal = create((set) => ({
  category: {},
  changeCategory: (category) => set({ category }),
}));

export default useCategoryModal;