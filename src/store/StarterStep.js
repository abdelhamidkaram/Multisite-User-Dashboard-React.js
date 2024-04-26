import { create } from "zustand";


const useStarterSteps = create((set)=>({
  currentStep:2,
  changeStep:(step)=>set({currentStep:step})
}));

export default useStarterSteps ;