import { Component, Input, OnInit } from '@angular/core';
import { BarrasSimple } from '../../../model/graficos/barras/baras-simple';
import { BarrasSimpleDatos } from '../../../model/graficos/barras/baras-simple-datos';
import { CONST } from '../../../model/const/CONST';

@Component({
  selector: 'grafico-barras-simple',
  standalone: false,
  templateUrl: './barras-simple.component.html',
  styleUrl: './barras-simple.component.css'
})
export class BarrasSimpleComponent implements OnInit {


  @Input()
  public datos: BarrasSimpleDatos | undefined;
  public chartOptions: BarrasSimple;

  constructor() {
    this.chartOptions = this.ejemplo();
  }


  ngOnInit(): void {
    if (this.datos != undefined)
      this.chartOptions = this.generate(this.datos);
  }


  private generate(data: BarrasSimpleDatos): BarrasSimple {
    //Cambiamos el inicio del diagrama
    let min = Math.min( ...data.data);
    min = Math.round(min*CONST.yAxisMin);
    return {
      series: [
        {
          name: data.dataLabel,
          data: data.data
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
      plotOptions: {
        bar: {
          columnWidth: "90%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (y: number) {
          y = Math.round(y / data.factor) / data.decimales;
          let num = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(y);
          return data.prefix + num + data.sufix;
        },
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          colors: ["var(--GrapLabel)"]
        }
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      yaxis: {
        min: min,
        labels: {
          //   show: true,
          formatter: function (y) {
            y = Math.round(y / data.factor) / data.decimales;
            let num = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(y);
            return data.prefix + num + data.sufix;
          },
          style: {
            fontSize: '15px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: "var(--GrapLabel)"
          }
        }
      },
      xaxis: {
        categories: data.categories,
        labels: {
          style: {
            fontSize: '15px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: "var(--GrapLabel)"
          }
        }
      },
      colors: data.colors,
      title: {
        text: data.chartLabel,
        align: 'center',
        style: {
          fontSize: '17px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          color: "var(--GrapLabel)"
        }
      }
    };
  }


  public ejemplo(): BarrasSimple {
    return {
      series: [
        {
          name: "Salario",
          data: [1950000, 1548000, 1021400, 2758000]
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
      plotOptions: {
        bar: {
          columnWidth: "70%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (y: number) {
          y = Math.round(y / 1000) / 1000;
          let num = y.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
          return '$ ' + num + 'M';
        },
        style: {

        }
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      yaxis: {
        labels: {
          //   show: true,
          formatter: function (y) {
            y = Math.round(y / 1000) / 1000;
            let num = y.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            return '$ ' + num + 'M';
          },
          style: {
            fontSize: '15px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: ['#FF002B']
          }
        }
      },
      xaxis: {
        categories: ["Gaviria", "Uribe", "Duque", "Petro"],
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
            ],
            fontSize: "12px"
          }
        }
      },
      colors: ["#008FFB", "#FF4560", "#FEB019", "#00E396"],
      title: {
        text: "100% Stacked Bar"
      },
    };
  }


}
