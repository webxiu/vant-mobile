import { LoginInfoType, getLoginInfo, setLoginInfo } from "@/utils/storage";

import { defineStore } from "pinia";
import { store } from "@/store";

export type { LoginInfoType };

interface AppState {
  userInfo: LoginInfoType;
}
export const useUserStore = defineStore({
  id: "user",
  state: (): AppState => {
    const userInfo = getLoginInfo();
    return { userInfo };
  },
  getters: {
    getUserInfo(): LoginInfoType {
      return getLoginInfo();
    },
  },
  actions: {
    setUserInfo(userInfo: LoginInfoType): void {
      setLoginInfo(userInfo);
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
