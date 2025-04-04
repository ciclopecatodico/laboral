import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexXAxis,
  ApexGrid,
  ApexLegend,
  ApexTitleSubtitle
} from "ng-apexcharts";


/**
 * Ideal para mostrar el total de ingresos percibidos por reforma
 */
export class BarrasSimple {

  constructor(
    public series: ApexAxisChartSeries,
    public chart: ApexChart,
    public dataLabels: ApexDataLabels,
    public plotOptions: ApexPlotOptions,
    public yaxis: ApexYAxis,
    public xaxis: ApexXAxis,
    public grid: ApexGrid,
    public colors: string[],
    public legend: ApexLegend,
    public title: ApexTitleSubtitle,
  ) { }


};