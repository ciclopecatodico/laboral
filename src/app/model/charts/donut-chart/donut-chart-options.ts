import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";


/**
 * Para mostrar la compocición porcentual de los diferentes tipos de horas.  
 */
export class DonutChart {

  constructor(
    public name: string,
    public label : string,
    public series: ApexNonAxisChartSeries,
    public chart: ApexChart,
    public responsive: ApexResponsive[],
    public labels: any,
    public dataLabels : ApexDataLabels
  ) { }
  
};