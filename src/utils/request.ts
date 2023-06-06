import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import axios from "axios";
import router from "@/router";
import { showToast } from "vant";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 2 * 60 * 1000,
});

axiosInstance.interceptors.request.use((config) => {
  // config.headers["Authorization"] = "Bearer " + getUserInfo().token;
  return config;
});
axiosInstance.interceptors.response.use(
  (response: AxiosRequestConfig<BaseResponseType<{}>>): any => {
    const data = response.data;
    if (data?.status === 401) {
      const timer = setTimeout(() => {
        showToast({ message: "请重新登录", type: "fail", position: "top" });
        router.push("/payroll");
        clearTimeout(timer);
      }, 3000);
    } else if (data?.status === 403) {
      showToast({ message: "未授权", position: "top" });
    }
    return response.data;
  },
  (err) => {
    const isTimeout = err.message.includes("timeout");
    if (axios.isCancel(err)) {
      showToast({ message: err.message || "取消请求", position: "top" });
    } else {
      showToast({
        message: isTimeout ? "网络请求超时" : err.message || "连接到服务器失败",
        type: "fail",
        position: "top",
        duration: 2 * 1000,
      });
    }
    if (err?.response?.data?.hasError) {
      err.message = err.response.data.errorDesc || "网络错误";
    }
    return Promise.reject(err);
  }
);

/** 自定义响应结果类型 */
function createRequest(instance: AxiosInstance) {
  return function (config: AxiosRequestConfig) {
    return instance(config) as Promise<BaseResponseType<{}>>;
  };
}

/** 用于网络请求的方法 */
export const request = createRequest(axiosInstance);

export { AxiosRequestConfig, AxiosResponse };
export default axiosInstance;
