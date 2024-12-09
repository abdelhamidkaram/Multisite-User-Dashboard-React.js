import { create } from "zustand";

const useInitData = create((set) => ({
  products: [],
  Orders:[],
  mothalyData:[],
  summaryData:[],
  setProducts: (productsData) => set({ products: productsData }),
  setOrders: (ordersData) => set({ Orders: ordersData }),
  setMothalyData: (mothalyData) => set({ mothalyData: mothalyData }),
  setSummaryData: (summaryData) => set({ summaryData: summaryData }),
  
}));

export default useInitData;
