import { Injectable } from '@angular/core';
import { DonutChart } from '../../model/charts/donut-chart/donut-chart-options';
import { CONST } from '../../model/const/CONST';


@Injectable({
  providedIn: 'root'
})
export class GraficoService {

  constructor() {

  }


  public dona(reformaName: string, reformaLabel: string, series: number[], labels: string[]): DonutChart {
    return {
      name: reformaName,
      label: reformaLabel,
      series: series,
      chart: {
        type: "donut",
        width: 400
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 240,
          options: {
            chart: {
              width: 100
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ], 
      dataLabels: {
        enabled: true,
        style:{
          fontSize:'14px',
          //fontWeight: 'bold',
          //colors: ['#322513']
        },
        formatter: (val, opt) => {
          switch (opt.seriesIndex) {
            case 0:
              return [CONST.horasDiurnas.label, series[0] + 'h | ' + val as string + '%'] as unknown as string;
            case 1:
              return [CONST.horasNocturnas.label, series[1] + 'h | ' + val as string + '%'] as unknown as string;
            case 2:
              return [CONST.horasExtrasDiurnas.label, series[2] + 'h | ' + val as string + '%'] as unknown as string;
            case 3:
              return [CONST.horasExtrasNocturnas.label, series[3] + 'h | ' + val as string + '%'] as unknown as string;
            default:
              return val as string;
          }
        },
        
      },
      colors : ["#26a69a","#008ffb","#00E396","#546E7A"]
    };
  }



  public pastel(reformaName: string, reformaLabel: string, series: number[], labels: string[]): DonutChart {
    console.log("Generar pastel???");
    return {
      name: reformaName,
      label: reformaLabel,
      series: series,
      chart: {
        type: "pie",
        width: 400
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 300,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      dataLabels: {
        enabled: true,
        formatter: (val) => {
          return val + "???%"
        },
        style:{
          fontSize:'12px',
          //colors: ['#363d3e']
        },
      },
      colors : ["#008FFB","#FF4560","#FEB019","#00E396"]
    };
  }

 
}
