import axiosInstance, { AxiosRequestConfig } from "@/utils/request";

/**
 * 获取经营数据
 * @param params 请求参数
 * @param config 配置项
 * @returns 请求实例
 */
export const loginApi = (params, config?: AxiosRequestConfig) => {
  return axiosInstance.request({
    url: "/app/qywx/workspace/mangerdata/saleokratedata",
    method: "POST",
    params,
    ...config,
  });
};
