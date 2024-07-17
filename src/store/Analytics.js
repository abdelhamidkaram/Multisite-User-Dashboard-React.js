import { create } from "zustand";

 const useAnalytics = create((set) => ({
  orders:[],
  months:[],
  setOrders: (orders) => set({ orders: orders }),  
  setMonths: (months) => set({ months: months }),  
}));

export default  useAnalytics