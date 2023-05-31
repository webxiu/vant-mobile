import { onMounted, reactive, ref, watch } from "vue";

import { AxiosResponse } from "@/utils/request";
import { showToast } from "vant";

export interface AuditTaskType {
  limit: number;
  page?: number;
  pageNo?: number;
  searchFrom?: number;
  taskState?: number;
  searchKey?: string;
}

export const TabActiveColor = "#1989fa";

type ApiType = (params: AuditTaskType) => Promise<AxiosResponse<any, any>>;

export function useSearchHook(api: ApiType, params: AuditTaskType) {
  const result = reactive({ data: {} });
  const isLoading = ref<boolean>(false);

  onMounted(() => {
    getData();
  });

  watch(params, (newVal) => {
    result.data = newVal;
    getData();
  });

  const getData = () => {
    isLoading.value = true;
    api(params)
      .then((res) => {
        result.data = res;
        isLoading.value = false;
        showToast({ message: "数据获取成功", position: "top" });
        console.log("useInfoHook:", res);
      })
      .catch((err) => {
        showToast({ message: "数据获取失败", position: "top" });
      });
  };
  return { data: result, isLoading, getData };
}
