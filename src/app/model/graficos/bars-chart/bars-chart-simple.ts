import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexXAxis,
  ApexLegend,
  ApexResponsive,
  ApexTooltip
} from "ng-apexcharts";


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
    public xaxis: ApexXAxis,
    public legend: ApexLegend,
    public responsive: ApexResponsive[],
    public tooltip : ApexTooltip,
    public colors: string[]
  ) { }
};