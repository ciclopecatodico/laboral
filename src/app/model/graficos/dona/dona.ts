import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexDataLabels,
  ApexTitleSubtitle
} from "ng-apexcharts";


/**
 * Para mostrar la compocición porcentual de los diferentes tipos de horas.  
 */
export class Dona {

  constructor(
    public series: ApexNonAxisChartSeries,
    public chart: ApexChart,
    public responsive: ApexResponsive[],
    public labels: any,
    public dataLabels : ApexDataLabels,
    public colors: string[],
    public title: ApexTitleSubtitle
  ) { }
  
};