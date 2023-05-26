import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

import { BaseResponse } from "~/types/request.d";
import { showToast } from "vant";
import router from "@/router";

const axiosInstance = axios.create({
  baseURL: "/api",
  // 2分钟
  timeout: 2 * 60 * 1000,
});

axiosInstance.interceptors.request.use((config) => {
  // config.headers["Authorization"] = "Bearer " + getUserInfo().token;
  return config;
});
axiosInstance.interceptors.response.use(
  (response: AxiosRequestConfig<BaseResponse<{}>>): any => {
    const data = response.data;
    console.log("response", response);
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

export { AxiosRequestConfig, AxiosResponse };
export default axiosInstance;
