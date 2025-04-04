import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexXAxis,
  ApexLegend,
  ApexStroke,
  ApexFill,
} from "ng-apexcharts";

/**
 * Ideal para mostrar la liquidación de los diferentes tipos de horas por reforma
 */
export class BarChartCompuesto {

  constructor(
    public name: string,
    public label: string,
    public series: ApexAxisChartSeries,
    public chart: ApexChart,
    public dataLabels: ApexDataLabels,
    public plotOptions: ApexPlotOptions,
    public yaxis: ApexYAxis,
    public xaxis: ApexXAxis,
    public fill: ApexFill,
    public stroke: ApexStroke,
    public legend: ApexLegend
  ) { }

  
};