import { Injectable } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { LiquidadorHorasService } from '../liquidador-horas/liquidador-horas.service';

import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { CONST } from '../../../model/const/CONST';
import { DonutChart } from '../../../model/charts/donut-chart/donut-chart-options';
import { Semana } from '../../../model/simulacion/agno copy/semana';
import { GraficoService } from '../../grafico/grafico.service';
import { BarChartCompuesto } from '../../../model/charts/bars-chart/bars-chart-compuesto';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { ConfigurationService } from '../../configuration/configuration.service';
import { ApexAxisChartSeries } from 'ng-apexcharts';
import { BarChartSimple } from '../../../model/charts/bars-chart/bars-chart-simple';

/**
 * Liquida las horas totales diarias para una semana segun los horarios definidos en una reforma. 
 */
@Injectable({
  providedIn: 'root'
})
export class LiquidadorSemanaService {

  public liquidadorHorasService: LiquidadorHorasService;
  public graficoService: GraficoService;

  public semana1950 = new Array<HorasSemana>();
  public semana789 = new Array<HorasSemana>();
  public semana2021 = new Array<HorasSemana>();
  public semana2025 = new Array<HorasSemana>();
  public totales = new Array<HorasSemana>();
  public donas = new Array<DonutChart>();

  public series: ApexAxisChartSeries;
  public parametros: Parametros[];



  constructor(configurationService: ConfigurationService, liquidadorHorasService: LiquidadorHorasService, graficoService: GraficoService) {
    this.parametros = configurationService.parametros;
    this.liquidadorHorasService = liquidadorHorasService;
    this.graficoService = graficoService;
    this.series = [];
  }

  public liquidar(peticion: Peticion): Semana {
    this.donas = new Array<DonutChart>();
    this.series = [];
    this.semana1950 = this.liquidadorHorasService.calcularSemana(peticion, CONST.reforma1950.index);
    this.semana789 = this.liquidadorHorasService.calcularSemana(peticion, CONST.reforma789.index);
    this.semana2021 = this.liquidadorHorasService.calcularSemana(peticion, CONST.reforma2101.index);
    this.semana2025 = this.liquidadorHorasService.calcularSemana(peticion, CONST.reforma2025.index);

    this.calcularTotales(this.semana1950, CONST.reforma1950.style);
    this.calcularTotales(this.semana789, CONST.reforma789.style);
    this.calcularTotales(this.semana2021, CONST.reforma2101.style);
    this.calcularTotales(this.semana2025, CONST.reforma2025.style);

    let horasSemana = new Array<HorasSemana>();
    horasSemana = [...this.semana1950, ...this.semana789, ...this.semana2021, ...this.semana2025];

    let horasTipo = this.setBarrasTipoHoras();
    let horasPonderado = this.setBarrasTipoHorasPonderado();
    let horastotal = this.setHorasTotal();

    return new Semana(horasSemana, this.donas, horasTipo, horasPonderado, horastotal);
  }

  public calcularTotales(semana: Array<HorasSemana>, style: string) {
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

    let total = new HorasSemana(CONST.total.id, CONST.total.label, semana[0].reformaName, semana[0].reformaLabel, style, [], horasDiurnas, horasNocturnas, horasExtraDiurna, horasExtraNocturna, totalHoras);
    semana.push(total);
    //para generar el grafico de barras compuesto
    this.totales.push(total);

    let dona = this.setDonaPorHoras(total, semana[0].reformaName, semana[0].reformaLabel);
    this.donas.push(dona);
  }


  /**
   * Genera los datos para un gráfico
   * @param horasSemana 
   * @param reformaName 
   * @returns 
   */
  private setDonaPorHoras(horasSemana: HorasSemana, reformaName: string, reformaLabel: string): DonutChart {
    let labels = structuredClone(CONST.tipoDeHoras.categorias);
    let horas = [horasSemana.horasDiurnas, horasSemana.horasNocturnas, horasSemana.horasExtraDiurna, horasSemana.horasExtraNocturna];
    // for (let i = 0; i < horas.length; i++) {
    //   labels[i] = labels[i] + ' ' + horas[i] + 'h';
    // }
    return this.graficoService.pastel(reformaName, reformaLabel, horas, labels);
  }


  /**
   * Crea un grafico que compara los diferentes tipos de horas por reforma 
   * @returns 
   */
  private setBarrasTipoHoras(): BarChartCompuesto {
    let categorias = Array<string>();
    this.parametros.forEach(p => { categorias.push(p.reformaLabel) });
    this.series = this.generarSeries(false);
    return this.graficoService.barrasCompuesto(CONST.tipoDeHoras.id, CONST.tipoDeHoras.label, this.series, categorias, 'Horas', false);
  }


  /**
 * Crea un grafico que compara los diferentes tipos de horas por reforma 
 * @returns 
 */
  private setBarrasTipoHorasPonderado(): BarChartCompuesto {
    let categorias = Array<string>();
    this.parametros.forEach(p => { categorias.push(p.reformaLabel) });

    this.series = this.generarSeries(true);
    return this.graficoService.barrasCompuesto(CONST.tipoDeHorasPonderados.id, CONST.tipoDeHorasPonderados.label, this.series, categorias, 'Valor', true);
  }


  /**
   * 
   */
  private setHorasTotal(): BarChartSimple {
    let categorias = Array<string>();
    this.parametros.forEach(p => { categorias.push(p.reformaLabel) });
    return this.graficoService.barrasSimple(CONST.tipoDeHorasPonderados.id, CONST.tipoDeHorasPonderados.label);
  }



  /**
   * Genera la serie de datos agrupado por tipo de horas 
   * @returns 
   */
  private generarSeries(ponderado: boolean): ApexAxisChartSeries {
    let diurnas = Array<number>();
    let nocturnas = Array<number>();
    let extraDiurnas = Array<number>();
    let extraNocturnas = Array<number>();
    let sumatoria = Array<number>();

    //valores para ponderar las horas, por defecto 1 que no afecta los valores
    let diurna = 1;
    let nocturna = 1;
    let extraDiurna = 1;
    let extraNocturna = 1;

    this.totales.forEach(
      t => {
        if (ponderado) {
          let reforma = this.parametros.find(p => p.reformaName === t.reformaName);
          if (reforma) {
            diurna = reforma.horasDiurnas.factor * reforma.smlvHora;
            nocturna = reforma.horasNocturnas.factor * reforma.smlvHora;
            extraDiurna = reforma.horasExtrasDiurnas.factor * reforma.smlvHora;
            extraNocturna = reforma.horasExtrasNocturnas.factor * reforma.smlvHora;
          }
        }

        let diurnaPonderada = this.round(t.horasDiurnas * diurna);
        let nocturnaPonderada = this.round(t.horasNocturnas * nocturna);
        let extraDiurnaPonderada = this.round(t.horasExtraDiurna * extraDiurna);
        let extraNocturnaPonderada = this.round(t.horasExtraNocturna * extraNocturna);

        diurnas.push(diurnaPonderada);
        nocturnas.push(nocturnaPonderada);
        extraDiurnas.push(extraDiurnaPonderada);
        extraNocturnas.push(extraNocturnaPonderada);
        sumatoria.push(diurnaPonderada + nocturnaPonderada + extraDiurnaPonderada + extraNocturnaPonderada)
      }
    );

    let dirunasSerie = {
      name: CONST.horasDiurnas.label,
      data: diurnas
    };

    let nocturnasSerie = {
      name: CONST.horasNocturnas.label,
      data: nocturnas
    };

    let extraDirunasSerie = {
      name: CONST.horasExtrasDiurnas.label,
      data: extraDiurnas
    };

    let extraNocturnasSerie = {
      name: CONST.horasExtrasNocturnas.label,
      data: extraNocturnas
    };

    let sumatoriaSerie = {
      name: CONST.horasPonderadas.label,
      data: sumatoria
    };

    if (ponderado) {
      return [dirunasSerie, nocturnasSerie, extraDirunasSerie, extraNocturnasSerie, sumatoriaSerie];
    }
    return [dirunasSerie, nocturnasSerie, extraDirunasSerie, extraNocturnasSerie];
  }

  private round(data: number) {
    return Math.round(data * 100) / 100;
  }
}
