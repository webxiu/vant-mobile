import type { EChartsOption } from "echarts";

export interface OptionsType<T> {
  data: T[];
  year: number;
  month: string;
}

export interface SaleItemType {
  FYEAR: number;
  ItemValue: number;
  ItemName: string;
  FMonthName: string;
}

// 暂无数据时绘制提示文本
const noDataText = [
  {
    type: "text",
    top: "50%",
    left: "40%",
    cursor: "default",
    style: {
      text: "暂无数据",
      font: "16px Microsoft YaHei",
      fill: "#969799",
    },
  },
];
// X轴1-12月份坐标
const xAxis = Array.from(new Array(12)).map((_, i) => `${i + 1}月`);

// 1.销售数据
export const option_1 = (opeions: OptionsType<SaleItemType>) => {
  const { data, year, month } = opeions;
  // 过滤出当前年份数据
  const currentYearData: SaleItemType[] = data.filter(
    (item: SaleItemType) => item.FYEAR == year
  );

  //   月实际销售额
  const realData = currentYearData
    .filter((item) => item.ItemName === "月实际销售额")
    .map((item) => {
      const name = item.FMonthName;
      const value = (item.ItemValue / 10000).toFixed(2);
      return { name, value, FYEAR: item.FYEAR, ItemName: item.ItemName };
    })
    .sort((a, b) => parseInt(a.name) - parseInt(b.name));
  // 月计划销售额
  const plainData = currentYearData
    .filter((item) => item.ItemName === "月计划销售额")
    .map((item) => {
      const name = item.FMonthName;
      const value = (item.ItemValue / 10000).toFixed(2);
      return { name, value, FYEAR: item.FYEAR, ItemName: item.ItemName };
    })
    .sort((a, b) => parseInt(a.name) - parseInt(b.name));

  // 销售达成率
  const salesRate = currentYearData.filter(
    (item) =>
      item.ItemName == "销售达成率" &&
      item.FYEAR == year &&
      parseInt(item.FMonthName) == parseInt(month)
  )[0];

  const title = `销售数据(单位:万元, 达成率${salesRate?.ItemValue || "0.00"}%)`;
  const option: EChartsOption = {
    title: { text: title, top: 5 },
    legend: [{ top: "30px" }],
    tooltip: { trigger: "axis" },
    grid: {
      top: 80,
      left: "3%",
      right: "3%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: { type: "category", boundaryGap: false, data: xAxis },
    yAxis: { type: "value" },
    graphic: {
      elements: realData.length || plainData.length ? [] : noDataText,
    },
    series: [
      {
        type: "line",
        name: "实际",
        label: { show: true },
        smooth: true,
        data: realData,
      },
      {
        type: "line",
        name: "计划",
        label: { show: true },
        smooth: true,
        data: plainData,
      },
    ],
  };
  return option;
};

export interface ProductItemType {
  [key: number | string]: number;
}

// 2.生产数据
export const option_2 = (opeions: OptionsType<ProductItemType>) => {
  const { data, year, month } = opeions;

  const _dataObj = data[0];
  const prodData = Object.keys(_dataObj || {})
    .map((_, i) => _dataObj[i])
    .filter(Boolean);

  const title = `生产数据(单位:Pcs)`;
  const option: EChartsOption = {
    title: { text: title, top: 5 },
    legend: [{ top: "30px" }],
    tooltip: { trigger: "axis" },
    grid: {
      top: 50,
      left: "3%",
      right: "3%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: { type: "category", boundaryGap: false, data: xAxis },
    yAxis: { type: "value" },
    graphic: { elements: prodData.length ? [] : noDataText },
    series: [
      { type: "line", label: { show: true }, smooth: true, data: prodData },
    ],
  };
  return option;
};

export interface ComplainItemType {
  month: number;
  num: number;
}
// 3.客户投诉
export const option_3 = (opeions: OptionsType<ComplainItemType>) => {
  const { data, year, month } = opeions;
  let totalNum = 0;
  let complainData: number[] = [];
  const max = Math.max(...data.map((item) => item.num));
  const indicator = xAxis.map((name) => ({ name, max: max })).reverse();

  for (let i = 1; i <= 12; i++) {
    const dataItem = data.filter(({ month }) => month == i)[0];
    if (dataItem) {
      complainData.push(dataItem.num);
      totalNum += dataItem.num;
    } else {
      complainData.push(0);
    }
  }
  complainData = complainData.reverse();

  const title = `客户投诉(单位:笔, 总计:${totalNum}笔)`;
  const option: EChartsOption = {
    title: { text: title, top: 5 },
    legend: [{ top: "30px" }],
    grid: {
      top: 80,
      left: "3%",
      right: "3%",
      bottom: "5%",
      containLabel: true,
    },
    radar: {
      indicator: indicator,
      center: ["50%", "60%"],
      radius: 90,
    },
    graphic: { elements: complainData.length ? [] : noDataText },
    series: [
      {
        type: "radar",
        data: [
          {
            label: { show: true },
            value: complainData,
            areaStyle: { color: "rgba(0,0,0,0.4)" },
          },
        ],
      },
    ],
  };
  return option;
};

export interface HumanResourcestemType {
  /** 月份 */
  today: number;
  /** 人数 */
  num: number;
  /** 人员类型(1:职员 2:临时工 3:员工) */
  type: "1" | "2" | "3";
}

// 4.人力资源
export const option_4 = (opeions: OptionsType<HumanResourcestemType>) => {
  const { data, year, month } = opeions;

  const clerkData: number[] = []; // 职员
  const tempData: number[] = []; // 临时工
  const staffData: number[] = []; // 员工

  data.forEach((item) => {
    if (item.type === "1") {
      clerkData.push(item.num);
    } else if (item.type === "2") {
      tempData.push(item.num);
    } else if (item.type === "3") {
      staffData.push(item.num);
    }
  });
  const peopleNum =
    clerkData[clerkData.length - 1] +
    tempData[clerkData.length - 1] +
    staffData[clerkData.length - 1];

  const title = `人力资源(单位:人, 总人数:${peopleNum}人)`;
  const option: EChartsOption = {
    title: { text: title, top: 5 },
    legend: [{ top: "30px" }],
    tooltip: { trigger: "axis" },
    grid: {
      top: 80,
      left: "3%",
      right: "3%",
      bottom: "5%",
      containLabel: true,
    },

    xAxis: { type: "category", boundaryGap: false, data: xAxis },
    yAxis: { type: "value" },
    graphic: {
      elements:
        clerkData.length || tempData.length || staffData.length
          ? []
          : noDataText,
    },
    series: [
      {
        name: "职员人数",
        label: { show: true },
        type: "line",
        smooth: true,
        data: clerkData,
      },
      {
        name: "临时工人数",
        label: { show: true },
        type: "line",
        smooth: true,
        data: tempData,
      },
      {
        name: "员工人数",
        label: { show: true },
        type: "line",
        smooth: true,
        data: staffData,
      },
    ],
  };
  return option;
};
