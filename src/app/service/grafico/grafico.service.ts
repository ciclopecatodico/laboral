import { Injectable } from '@angular/core';
import { DonutChart } from '../../model/charts/donut-chart/donut-chart-options';
import { BarChartSimple } from '../../model/charts/bars-chart/bars-chart-simple';
import { BarChartCompuesto } from '../../model/charts/bars-chart/bars-chart-compuesto';
import { Series } from '../../model/charts/series/series';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {

  constructor() { }


  public setDonut(reformaName: string, reformaLabel: string, series: number[], labels: string[]): DonutChart {
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

  public setPie(reformaName: string, reformaLabel: string, series: number[], labels: string[]): DonutChart {
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
      ]
    };
  }


  public setBarSimple(reformaName: string, reformaLabel: string): BarChartSimple {
    return {
      name: reformaName,
      label: reformaLabel,
      series: [
        {
          name: "distibuted",
          data: [21, 22, 10, 28, 16, 21, 13, 30]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
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
          ["John", "Doe"],
          ["Joe", "Smith"],
          ["Jake", "Williams"],
          "Amber",
          ["Peter", "Brown"],
          ["Mary", "Evans"],
          ["David", "Wilson"],
          ["Lily", "Roberts"]
        ],
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
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
  public setBarCompuesto(reformaName: string, reformaLabel: string, series: ApexAxisChartSeries, categories: string[], tituloY: string, dinero: boolean): BarChartCompuesto {
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
        enabled: true
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: categories
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
            return `${this.numberWithCommas(value)}`;
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
        show: false
      },
    };
  }


  private numberWithCommas(x: number) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
}
