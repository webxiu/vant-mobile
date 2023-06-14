import { LoginInfoType, getLoginInfo, setLoginInfo } from "@/utils/storage";

import { defineStore } from "pinia";
import { queryUserInfo } from "@/api/user";
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
    setUserInfo(): void {
      queryUserInfo({})
        .then((res) => res.data && setLoginInfo(res.data))
        .catch(console.log);
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
