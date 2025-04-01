import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export class Series {

  constructor(
    public name : string,
    public data: number[],
  ) { }
};