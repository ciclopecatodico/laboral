import { Component, Input, OnInit } from '@angular/core';
import { Dona } from '../../../model/graficos/dona/dona';
import { DonaDatos } from '../../../model/graficos/dona/dona-datos';
import { CONST } from '../../../model/const/CONST';


@Component({
  selector: 'grafico-dona',
  standalone: false,
  templateUrl: './dona.component.html',
  styleUrl: './dona.component.css'
})
export class DonaComponent implements OnInit {


  @Input()
  public datos: DonaDatos[] | undefined;

  public donas: Dona[] | undefined;


  constructor() {
    let dato = {
      series: [5, 10, 20, 40],
      labels: ["Uno", "Dos", "Tres", "Cuatro"],
      colores: ["#26a69a", "#008ffb", "#00E396", "#546E7A"],
      chartLabel: "Titulo Dona",
      labelColor: ["#008FFB"]
    }
    this.datos = [dato, dato];
  }

  ngOnInit(): void {
    this.genrarDonas();
  }

  private genrarDonas() {
    this.donas = new Array<Dona>();
    this.datos?.forEach(d => {
      this.donas?.push(this.dona(d));
    });
  }

  private dona(datos: DonaDatos): Dona {
    return {
      series: datos.series,
      chart: {
        type: "donut",
        width: 400
      },
      labels: datos.labels,
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
        style: {
          fontSize: '13px',
          //fontWeight: 'bold',
          colors: ['var(--GrapLabel)']
        },
        formatter: (val, opt) => {
          let p = val as number;
          p = Math.round(p * 10) / 10;
          switch (opt.seriesIndex) {
            case 0:
              return [CONST.horasDiurnas.label, datos.series[0] + 'h | ' + p + '%'] as unknown as string;
            case 1:
              return [CONST.horasNocturnas.label, datos.series[1] + 'h | ' + p + '%'] as unknown as string;
            case 2:
              return [CONST.horasExtrasDiurnas.label, datos.series[2] + 'h | ' + p + '%'] as unknown as string;
            case 3:
              return [CONST.horasExtrasNocturnas.label, datos.series[3] + 'h | ' + p + '%'] as unknown as string;
            case 4:
              return [CONST.tipoDeHorasMenorAJornada.label, datos.series[4] + 'h | ' + p + '%'] as unknown as string;
            default:
              return val as string;
          }
        },

      },
      colors: datos.colores,
      title: {
        text: datos.chartLabel,
        align: 'center',
        style: {
          fontSize: '17px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          color: datos.labelColor[0]
        }
      }
    };
  }


}
