import { Injectable } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { LiquidadorHorasService } from '../liquidador-horas/liquidador-horas.service';

import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { CONST } from '../../../model/const/CONST';
import { ChartOptions } from '../../../model/charts/charts-options/chart-options';
import { Semana } from '../../../model/simulacion/agno copy/semana';

/**
 * Liquida las horas totales diarias para una semana segun los horarios definidos en una reforma. 
 */
@Injectable({
  providedIn: 'root'
})
export class LiquidadorSemanaService {

  public liquidadorHorasService: LiquidadorHorasService;

  public semana1950 = new Array<HorasSemana>();
  public semana789 = new Array<HorasSemana>();
  public semana2025 = new Array<HorasSemana>();
  public charts = new Array<ChartOptions>();


  constructor(liquidadorHorasService: LiquidadorHorasService) {
    this.liquidadorHorasService = liquidadorHorasService;
  }

  public liquidar(peticion: Peticion): Semana {
    
    this.semana1950 = this.liquidadorHorasService.calcularSemana(peticion, CONST.reforma1950.index);
    this.semana789 = this.liquidadorHorasService.calcularSemana(peticion, CONST.reforma789.index);
    this.semana2025 = this.liquidadorHorasService.calcularSemana(peticion, CONST.reforma2025.index);

    this.calcularTotales(this.semana1950, CONST.reforma1950.style);
    this.calcularTotales(this.semana789, CONST.reforma789.style);
    this.calcularTotales(this.semana2025, CONST.reforma2025.style);

    let horasSemana = new Array<HorasSemana>();
    horasSemana = [...this.semana1950, ...this.semana789, ...this.semana2025];

    return new Semana(this.charts, horasSemana);
  }

  public calcularTotales(semana: Array<HorasSemana>, style : string) {
    let horasDiurnas = 0;
    let horasNocturnas = 0;
    let horasExtraDiurna = 0;
    let horasExtraNocturna = 0;
    let totalHoras = 0;

    semana.forEach(dia => {
      horasDiurnas += dia.horasDiurnas;
      horasNocturnas += dia.horasNocturnas;
      horasExtraDiurna += dia.horasExtraDiurna;
      horasExtraNocturna += dia.horasExtraNocturna;
      totalHoras += dia.totalHoras;
    });

    let total = new HorasSemana("total", "Total", semana[0].reformaName, semana[0].reformaLabel, style,[], horasDiurnas, horasNocturnas, horasExtraDiurna, horasExtraNocturna, totalHoras);
    semana.push(total);

    let chart = this.setChartByHoras(total, semana[0].reformaName, semana[0].reformaLabel);
    this.charts.push(chart);
  }


  /**
   * Genera los datos para un gráfico
   * @param horasSemana 
   * @param reformaName 
   * @returns 
   */
  private setChartByHoras(horasSemana: HorasSemana, reformaName:string, reformaLabel:string): ChartOptions {
    let labels = ["Diurnas", "Nocturnas", "Extra Diurnas", "Extra Nocturnas"];
    let horas = [horasSemana.horasDiurnas, horasSemana.horasNocturnas, horasSemana.horasExtraDiurna, horasSemana.horasExtraNocturna];
    return this.setChart(reformaName, reformaLabel, horas, labels);
  }



  private setChart(reformaName:string, reformaLabel:string, series: number[], labels: string[]): ChartOptions {
    return {
      name: reformaName,
      label : reformaLabel,
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

}
