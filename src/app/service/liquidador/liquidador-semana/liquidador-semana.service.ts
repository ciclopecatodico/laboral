import { Injectable } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { LiquidadorHorasService } from '../liquidador-horas/liquidador-horas.service';

import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { CONST } from '../../../model/const/CONST';
import { Semana } from '../../../model/simulacion/semana/semana';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { ConfigurationService } from '../../configuration/configuration.service';
import { ApexAxisChartSeries } from 'ng-apexcharts';
import { DonaDatos } from '../../../model/graficos/dona/dona-datos';
import { BarrasSimpleDatos } from '../../../model/graficos/barras/baras-simple-datos';

/**
 * Liquida las horas totales diarias para una semana segun los horarios definidos en una reforma. 
 */
@Injectable({
  providedIn: 'root'
})
export class LiquidadorSemanaService {

  public liquidadorHorasService: LiquidadorHorasService;

  public semana1950!: Array<HorasSemana>;
  public semana789!: Array<HorasSemana>;
  public semana1846 !: Array<HorasSemana>;
  public semana2021 !:  Array<HorasSemana>;
  public semana2025 !:  Array<HorasSemana>;
  public totales = new Array<HorasSemana>();

  public donaDatos = new Array<DonaDatos>();
  public horasTipo: BarrasSimpleDatos;
  public parametros: Parametros[];


  constructor(configurationService: ConfigurationService, liquidadorHorasService: LiquidadorHorasService) {
    this.parametros = configurationService.parametros;
    this.liquidadorHorasService = liquidadorHorasService;
    this.horasTipo = Object.create(BarrasSimpleDatos);
  }

  public simular(peticion: Peticion): Semana {
    this.donaDatos = new Array<DonaDatos>();
    this.horasTipo = Object.create(BarrasSimpleDatos);
    this.totales = new Array<HorasSemana>();
    this.semana1950 = this.liquidadorHorasService.calcularSemana(peticion, CONST.reforma1950.index);
    this.semana789 = this.liquidadorHorasService.calcularSemana(peticion, CONST.reforma789.index);
    this.semana1846 = this.liquidadorHorasService.calcularSemana(peticion, CONST.reforma1846.index);
    this.semana2021 = this.liquidadorHorasService.calcularSemana(peticion, CONST.reforma2101.index);
    this.semana2025 = this.liquidadorHorasService.calcularSemana(peticion, CONST.reforma2025.index);

    this.calcularTotales(this.semana1950, this.parametros[CONST.reforma1950.index], CONST.reforma1950.style);
    this.calcularTotales(this.semana789, this.parametros[CONST.reforma789.index], CONST.reforma789.style);
    this.calcularTotales(this.semana1846, this.parametros[CONST.reforma1846.index], CONST.reforma1846.style);
    this.calcularTotales(this.semana2021, this.parametros[CONST.reforma2101.index], CONST.reforma2101.style);
    this.calcularTotales(this.semana2025, this.parametros[CONST.reforma2025.index], CONST.reforma2025.style);

    let horasSemana = new Array<HorasSemana>();
    horasSemana = [...this.semana1950, ...this.semana789, ...this.semana1846, ...this.semana2021, ...this.semana2025];

    //this.horasPonderado = this.setBarrasTipoHorasPonderado();
    //this.horastotal = this.setHorasTotal();
    return new Semana(horasSemana, this.donaDatos, this.horasTipo);
  }

  public calcularTotales(semana: Array<HorasSemana>, parametro: Parametros, style: string) {
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

    let dona = this.setDonaPorHoras(parametro, total, semana[0]);
    this.donaDatos.push(dona);
  }


  /**
   * Genera los datos para un gráfico
   * @param horasSemana 
   * @param reformaName 
   * @returns 
   */
  private setDonaPorHoras(parametro: Parametros, horasSemana: HorasSemana, semana: HorasSemana): DonaDatos {

    let sum = horasSemana.horasDiurnas + horasSemana.horasNocturnas + horasSemana.horasExtraDiurna + horasSemana.horasExtraNocturna;
    let horas = [horasSemana.horasDiurnas, horasSemana.horasNocturnas, horasSemana.horasExtraDiurna, horasSemana.horasExtraNocturna];
    let categorias = CONST.tipoDeHoras.categorias;
    let colores= CONST.tipoDeHoras.colores;
    //Si las horas son diferentes a la jonada especifico unas horas vacías
    if (CONST.contarHorasSinRegistrar && parametro.jornadaLaboralSemanal > sum) {
      horas = [horasSemana.horasDiurnas, horasSemana.horasNocturnas, horasSemana.horasExtraDiurna, horasSemana.horasExtraNocturna, parametro.jornadaLaboralSemanal - sum];
      categorias = CONST.tipoDeHorasMenorAJornada.categorias;
      colores= CONST.tipoDeHorasMenorAJornada.colores;
    }
    let dona = {
      series: horas,
      labels: categorias,
      colores: colores,
      chartLabel: semana.reformaLabel,
      labelColor: ['var(--GrapLabel)']
    }
    return dona;
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

  /**
   * Genera la serie de datos agrupado por tipo de horas 
   * @returns 
   */
  private generarTotalesSeries(): number[] {
    console.log("Generar totales series???");
    let sumatoria = Array<any>();

    //valores para ponderar las horas, por defecto 1 que no afecta los valores
    let diurna = 1;
    let nocturna = 1;
    let extraDiurna = 1;
    let extraNocturna = 1;

    this.totales.forEach(
      t => {
        let reforma = this.parametros.find(p => p.reformaName === t.reformaName);
        if (reforma) {
          diurna = reforma.horasDiurnas.factor * reforma.smlvHora;
          nocturna = reforma.horasNocturnas.factor * reforma.smlvHora;
          extraDiurna = reforma.horasExtrasDiurnas.factor * reforma.smlvHora;
          extraNocturna = reforma.horasExtrasNocturnas.factor * reforma.smlvHora;
        }
        console.log("Reforma", reforma?.reformaName, reforma?.colorFill, reforma?.colorStroke);

        let diurnaPonderada = t.horasDiurnas * diurna;
        let nocturnaPonderada = t.horasNocturnas * nocturna;
        let extraDiurnaPonderada = t.horasExtraDiurna * extraDiurna;
        let extraNocturnaPonderada = t.horasExtraNocturna * extraNocturna;

        let sum = {
          x: reforma?.reformaLabel,
          y: this.round(diurnaPonderada + nocturnaPonderada + extraDiurnaPonderada + extraNocturnaPonderada),
          fillColor: reforma?.colorFill,
          strokeColor: reforma?.colorStroke,
        }

        sumatoria.push(sum)
      }
    );

    return sumatoria;
  }

  private round(data: number) {
    return Math.round(data * 10) / 10;
  }
}
