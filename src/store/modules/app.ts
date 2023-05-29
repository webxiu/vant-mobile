import { XXX } from "@/config/constant";
import { defineStore } from "pinia";
import { store } from "@/store";

interface AppState {
  count: number;
}
export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    count: 0,
  }),
  getters: {
    getPageCount(state): number {
      return state.count;
    },
  },
  actions: {
    setCount(count: number): void {
      this.count += count;
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
