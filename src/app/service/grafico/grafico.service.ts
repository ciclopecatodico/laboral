import { Injectable } from '@angular/core';
import { DonutChart } from '../../model/charts/donut-chart/donut-chart-options';
import { BarChartSimple } from '../../model/charts/bars-chart/bars-chart-simple';
import { BarChartCompuesto } from '../../model/charts/bars-chart/bars-chart-compuesto';
import { Series } from '../../model/charts/series/series';
import { CONST } from '../../model/const/CONST';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {

  constructor() { }


  public dona(reformaName: string, reformaLabel: string, series: number[], labels: string[]): DonutChart {
    return {
      name: reformaName,
      label: reformaLabel,
      series: series,
      chart: {
        type: "donut"
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
      ]
    };
  }

  public pastel(reformaName: string, reformaLabel: string, series: number[], labels: string[]): DonutChart {
    return {
      name: reformaName,
      label: reformaLabel,
      series: series,
      chart: {
        type: "pie",
        width: 380
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
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
      dataLabels : {
        enabled : true,
        formatter: (val, opt) => {
          switch (opt.seriesIndex) {
            case 0:
              return [ CONST.horasDiurnas.label, series[0]+'h | ' + val as string + '%' ] as unknown as string;
            case 1:
              return [ CONST.horasNocturnas.label, series[1]+'h | ' + val as string + '%' ] as unknown as string;
            case 2:
              return [ CONST.horasExtrasDiurnas.label, series[2]+'h | ' + val as string + '%' ] as unknown as string;
            case 3:
              return [ CONST.horasExtrasNocturnas.label, series[3]+'h | ' + val as string + '%' ] as unknown as string;
            default:
              return val as string;
          }
        },
      }
    };
  }


  public barrasSimple(reformaName: string, reformaLabel: string): BarChartSimple {
    return {
      name: reformaName,
      label: reformaLabel,
      series: [
        {
          name: "distibuted",
          data: [21, 22, 10, 28]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        // events: {
        //   click: function (chart, w, e) {
        //     // console.log(chart, w, e)
        //   }
        // }
      },
      colors: [
        "#cfe2ff",
        "#e2e3e5",
        "#cff4fc",
        "#d1e6dd",
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: true
      },
      legend: {
        show: true
      },
      grid: {
        show: false
      },
      yaxis: {
        title: {
          text: "Series A"
        },
      },
      xaxis: {
        categories: [
          "John", "Doe",
          "Joe", "Smith"
        ],
        labels: {
          style: {
            colors: [
              "#322513",
              "#322513",
              "#322513",
              "#322513",
            ],
            fontSize: "12px"
          }
        }
      }
    };
  }



  /**
   * 
   * @param reformaName 
   * @param reformaLabel 
   * @param series 
   * @param categories 
   * @param tituloY 
   * @param dinero formatea el eje y según sea dinero poniendo un $ antes o en miles si es numeros
   * @returns 
   */
  public barrasCompuesto(reformaName: string, reformaLabel: string, series: ApexAxisChartSeries, categories: string[], tituloY: string, dinero: boolean): BarChartCompuesto {
    return {
      name: reformaName,
      label: reformaLabel,
      series: series,
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          //endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: ['#322513']
        },
        formatter: (value) => {
          if (dinero) {
            return `$ ${this.numberWithCommas(value)}`;
          }
          return `${this.numberWithCommas(value)} h`;
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: ['#322513']
          }
        }
      },
      yaxis: {
        title: {
          text: tituloY
        },
        labels: {
          formatter: (value) => {
            if (dinero) {
              return `$ ${this.numberWithCommas(value)}`;
            }
            return `${this.numberWithCommas(value)} h`;
          },
        },
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          }
        }
      },
      legend: {
        show: true
      },
    };
  }


  private numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
}
