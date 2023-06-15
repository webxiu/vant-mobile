import Mock from "mockjs";

Mock.setup({
  timeout: 300,
});

// Mock the real back-end api structure.
export function intercepter<T>(data: T): BaseResponseType<T> {
  return {
    status: 200,
    message: "成功",
    data: data,
    timestamp: 999990,
  };
}

export const mock = Mock;
