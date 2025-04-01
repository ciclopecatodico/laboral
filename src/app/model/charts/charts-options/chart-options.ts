import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export class ChartOptions {

  constructor(
    public name: string,
    public label : string,
    public series: ApexNonAxisChartSeries,
    public chart: ApexChart,
    public responsive: ApexResponsive[],
    public labels: any
  ) { }
};