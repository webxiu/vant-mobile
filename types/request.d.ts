export interface BaseResponseType<T extends unknown> {
  data: T;
  status: number;
  message: string;
  timestamp: number;
}
