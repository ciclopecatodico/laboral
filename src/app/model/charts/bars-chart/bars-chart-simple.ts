import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
} from "ng-apexcharts";

import { XAxis } from "./XAxis";

/**
 * Ideal para mostrar el total de ingresos percibidos por reforma
 */
export class BarChartSimple {

  constructor(
    public name: string,
    public label: string,
    public series: ApexAxisChartSeries,
    public chart: ApexChart,
    public dataLabels: ApexDataLabels,
    public plotOptions: ApexPlotOptions,
    public yaxis: ApexYAxis,
    public xaxis: XAxis,
    public grid: ApexGrid,
    public colors: string[],
    public legend: ApexLegend,
  ) { }
};