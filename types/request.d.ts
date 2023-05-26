export interface BaseResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: number;
}
