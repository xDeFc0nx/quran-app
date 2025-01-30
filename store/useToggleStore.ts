// store/useToggleStore.ts
import { create } from "zustand";

interface ToggleStore {
  isVisible: boolean;
  toggleVisibility: () => void;
}

const useToggleStore = create<ToggleStore>((set) => ({
  isVisible: false,
  toggleVisibility: () =>
    set((state) => ({
      isVisible: !state.isVisible,
    })),
}));

export default useToggleStore;
