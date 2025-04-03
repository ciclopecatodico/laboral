import { Injectable } from '@angular/core';
import { DonutChart } from '../../model/charts/donut-chart/donut-chart-options';
import { BarChartSimple } from '../../model/charts/bars-chart/bars-chart-simple';
import { BarChartCompuesto } from '../../model/charts/bars-chart/bars-chart-compuesto';
import { CONST } from '../../model/const/CONST';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartType,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexXAxis,
  ApexLegend,
} from "ng-apexcharts";
import { ValorHoras } from '../../model/liquidacion/valor-horas/valor-horas';
import { Parametros } from '../../model/modelos-simulacion/parametros/parametros';

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

  // formatter: (val, opt) => {
        //   switch (opt.seriesIndex) {
        //     case 0:
        //       return [CONST.horasDiurnas.label, series[0] + 'h | ' + val as string + '%'] as unknown as string;
        //     case 1:
        //       return [CONST.horasNocturnas.label, series[1] + 'h | ' + val as string + '%'] as unknown as string;
        //     case 2:
        //       return [CONST.horasExtrasDiurnas.label, series[2] + 'h | ' + val as string + '%'] as unknown as string;
        //     case 3:
        //       return [CONST.horasExtrasNocturnas.label, series[3] + 'h | ' + val as string + '%'] as unknown as string;
        //     default:
        //       return val as string;
        //   }
        // },


  public barrasSimple(reformaName: string, reformaLabel: string, data: any[], yLabel :string): BarChartSimple {
    console.log("barraSimple:", yLabel);
    console.log("data:", JSON.stringify(data));
    return {
      name: reformaName,
      label: reformaLabel,
      series: [
        {
          name: "Salario",
          data: data
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        toolbar: this.toolbar
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
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
          //if (dinero) {
            return `$ ${this.numberWithCommas(value)} >>>>`;
          //}
          //return `${this.numberWithCommas(value)} h`;
        },
      },
      // legend: {
      //   show: true
      // },
      // grid: {
      //   show: false
      // },
      yaxis: {
        title: {
          text: yLabel
        },
        labels: {
          formatter: (value) => {
            return `$ ${this.numberWithCommas(value)} ???`;
          },
          style: {
            fontSize: '15px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: ['#322513']
          }
        },
      },
      xaxis: {
        labels: {
          style: {
            fontSize: '15px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: ['#322513']
          }
        }
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 360,
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
      tooltip : {
        y: {
          formatter: function(val: any) {
            return "$ " + val + " thousands"
          }
        }
      },
      colors : ["#008FFB","#FF4560","#FEB019","#00E396"]
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
        height: 350,
        type: "bar",
        toolbar: this.toolbar
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
            fontSize: '15px',
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
      legend: {
        show: true,
        fontSize: '16px',
        labels : {
          colors : ['#322513']
        }
      },
    };
  }


  private numberWithCommas(x: any) {
    let num: number = parseFloat(x);
    num = Math.round(num * 10) / 10;
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }


  private toolbar = {
    show: true,
    tools: {
      download: true,
      selection: false,
      zoom: false,
      zoomin: false,
      zoomout: false,
      pan: false
    }
  };


   /**GENERACIÓN DE DATOS PARA LOS GRÁFICOS  */
   public generarSeries(totales : ValorHoras[], parametros : Parametros[]): ApexAxisChartSeries {
    let sumatoria = Array<any>();
    //Obtiene el total por tipo de reforma 
    totales.forEach(vh => {
      let reforma = parametros.find(p => p.reformaName === vh.reformaName);
      let sum = {
        x: vh.reformaLabel,
        y: this.round(vh.totalValorHoras),
        fillColor: reforma?.colorFill,
        strokeColor: reforma?.colorStroke,
      }
      sumatoria.push(sum);
    });
    return sumatoria;
  }


  private round(data: number) {
    return Math.round(data * 10) / 10;
  }
}
