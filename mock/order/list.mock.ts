import Mock from "mockjs";
import { intercepter, mock } from "../config";

const List: any = [];
const count = 100;

const image_uri = "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3";

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      userId: "@integer(1000, 99999)",
      username: /^[\u4e00-\u9fa5]{1,5}$/,
      userName: Mock.mock("@cname(1, 4)"),
      orderName: Mock.Random.cname(),
      success_order: /^[0-9]{1,4}$/,
      paidMoney: "@float(1, 100000)",
      "status|1": [1, 2, 3],
      "total_order|1-10000.2": 1,
      "type|1": ["CN", "US", "JP", "EU"],
      author: "@first",
      forecast: "@float(0, 100, 2, 2)",
      title: "@title(5, 10)",
      bankNumber: "@integer(0000000000000000000, 6228482092418266115)",
      creatTime: "@date", // 年月日
      optTime: Mock.Random.date("yyyy-MM-dd"), // 年月日
      displayTime: "@datetime", // 年月日 时分秒
      timestamp: +Mock.Random.date("T"), // 时间戳
      url: image_uri,
      too1: Mock.mock("@csentence(3, 5)"),
      too6: Mock.Random.cparagraph(1, 5), // 段落
    })
  );
}

mock.mock("/order/list", "get", (config: any) => {
  return intercepter<any>({
    total: List.length,
    data: List,
  });
});
mock.mock("/order/create", "post", (config: any) => {
  // const body: any = JSON.parse(config?.body);
  return intercepter<any>({
    total: List.length,
    data: { name: "aaa", order: "cccc" },
  });
});
