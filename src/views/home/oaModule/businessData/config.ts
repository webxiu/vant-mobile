import * as echarts from "echarts";

import type { EChartsOption } from "echarts";

export interface SaleItemType {
  FYEAR: number;
  ItemValue: number;
  ItemName: string;
  FMonthName: string;
}

export interface ParamsType {
  el: HTMLElement;
  data: SaleItemType[];
  year: number;
  month: number;
  xAxis: string[];
}

export const initEcharts01 = (opeions) => {
  const { el, data, year, month, xAxis } = opeions;
  console.log("销售数据opeions:", opeions);

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

  const title = `销售数据(单位:万元,达成率${salesRate?.ItemValue || "0.00"}%)`;
  const option: EChartsOption = {
    title: { text: title, top: 5 },
    legend: [{ top: "30px" }],
    tooltip: { trigger: "axis" },
    grid: {
      top: "30%",
      left: "1%",
      right: "2%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: { type: "category", boundaryGap: false, data: xAxis },
    yAxis: { type: "value" },

    series: [
      {
        name: "实际",
        label: { show: true },
        type: "line",
        smooth: true,
        data: realData,
      },
      {
        name: "计划",
        label: { show: true },
        type: "line",
        smooth: true,
        data: plainData,
      },
    ],
  };

  const myChart = echarts.init(el);
  myChart.setOption(option);
};
export const initEcharts02 = (opeions) => {
  const { el, data, year, month, xAxis } = opeions;
  console.log("销售数据opeions:", opeions);

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

  const title = `销售数据(单位:万元,达成率${salesRate?.ItemValue || "0.00"}%)`;
  const option: EChartsOption = {
    title: { text: title, top: 5 },
    legend: [{ top: "30px" }],
    tooltip: { trigger: "axis" },
    grid: {
      top: "30%",
      left: "1%",
      right: "2%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: { type: "category", boundaryGap: false, data: xAxis },
    yAxis: { type: "value" },

    series: [
      {
        name: "实际",
        label: { show: true },
        type: "line",
        smooth: true,
        data: realData,
      },
      {
        name: "计划",
        label: { show: true },
        type: "line",
        smooth: true,
        data: plainData,
      },
    ],
  };

  const myChart = echarts.init(el);
  myChart.setOption(option);
};
