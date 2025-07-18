import { Injectable } from '@angular/core';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { ConfigurationService } from '../../configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';
import { Peticion } from '../../../model/peticion/peticion.model';
import { ValorHoras } from '../../../model/liquidacion/valor-horas/valor-horas';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { LiquidadorMesService } from '../liquidador-mes/liquidador-mes.service';
import { Agno } from '../../../model/simulacion/agno/ango';
import { BarrasSimpleDatos } from '../../../model/graficos/barras/baras-simple-datos';


/**
 * Liquida un conjunto de meses, tipicamente un año 
 * Utiliza un arreglo de horas[] que tiene los días de la semana con las horas calculadas
 * y debe recorrer un arreglo de meses en los que hace coincidir cada día con su respectivo
 * día en el calendario ej 1 es un jueves, entonces 2 es un viernes, 3 un sábado y 4 un domingo
 * y liquidar las horas según corresponda a días laborales típicamente lunes a sábado o dominicales
 * y festivos 
 */

@Injectable({
  providedIn: 'root'
})
export class LiquidadorMesesService {

  public configurationService: ConfigurationService;
  public liquidadorMesService: LiquidadorMesService;
  public parametros: Parametros[];

  /**
   * Guarda la liquidación de los meses de un año y su total. 
   */
  public agno1950 !: Array<ValorHoras>;
  public agno789 !: Array<ValorHoras>;
  public agno1846 !: Array<ValorHoras>;
  public agno2101 !: Array<ValorHoras>;
  public agno2025 !: Array<ValorHoras>;

  public totales !: Array<ValorHoras>;

  constructor(configurationService: ConfigurationService, liquidadorMesService: LiquidadorMesService) {
    this.configurationService = configurationService;
    this.liquidadorMesService = liquidadorMesService;
    this.parametros = configurationService.parametros;
  }

  /**
   * Calcula el valor de un mes para todas las reformas 
   * @param horasSemana 
   * @param peticion 
   */
  public simularMeses(horasSemana: HorasSemana[], peticion: Peticion): Agno {
    //Inicializa los arreglos que contienen las horas liquidadas por cada tipo de reforma
    this.liquidadorMesService.llenarHorasTotalesPorSemanaYReforma(horasSemana);
    //Limpiar variables que almacenan la simulacion
    this.agno1950 = new Array<ValorHoras>;
    this.agno789 = new Array<ValorHoras>;
    this.agno1846 = new Array<ValorHoras>;
    this.agno2101 = new Array<ValorHoras>;
    this.agno2025 = new Array<ValorHoras>;
    //obtener el año que trae los parametros de
    let agno = this.configurationService.agnoModel;

    let valorHora1950 = this.liquidadorMesService.calcularValorHora(peticion, CONST.reforma1950.index);
    let valorHora789 = this.liquidadorMesService.calcularValorHora(peticion, CONST.reforma789.index);
    let valorHora1846 = this.liquidadorMesService.calcularValorHora(peticion, CONST.reforma1846.index);
    let valorHora2101 = this.liquidadorMesService.calcularValorHora(peticion, CONST.reforma2101.index);
    let valorHora2025 = this.liquidadorMesService.calcularValorHora(peticion, CONST.reforma2025.index);

    //por defecto la duracion de la simulacion es 12 meses de un año
    let duracion = agno.meses.length;
    //pero para el caso del sena la duracion se ingresa 
    if (peticion.sena) {
      if (peticion.duracion && peticion.duracion > 0) {
        duracion = peticion.duracion;
      }
    }

    for (let i = 0; i < duracion; i++) {
      let mesIndex = i % 12;
      let mes1950 = this.liquidadorMesService.contarHorasMes(this.liquidadorMesService.semana1950, agno.meses[mesIndex], peticion, valorHora1950, CONST.reforma1950.index);
      this.agno1950.push(mes1950);

      let mes789 = this.liquidadorMesService.contarHorasMes(this.liquidadorMesService.semana789, agno.meses[mesIndex], peticion, valorHora789, CONST.reforma789.index);
      this.agno789.push(mes789);

      let mes1846 = this.liquidadorMesService.contarHorasMes(this.liquidadorMesService.semana1846, agno.meses[mesIndex], peticion, valorHora1846, CONST.reforma1846.index);
      this.agno1846.push(mes1846);

      let mes2101 = this.liquidadorMesService.contarHorasMes(this.liquidadorMesService.semana2101, agno.meses[mesIndex], peticion, valorHora2101, CONST.reforma2101.index);
      this.agno2101.push(mes2101);

      let mes2025 = this.liquidadorMesService.contarHorasMes(this.liquidadorMesService.semana2025, agno.meses[mesIndex], peticion, valorHora2025, CONST.reforma2025.index);
      this.agno2025.push(mes2025);
    }

    //limpio totales para volver a guardar los datos.
    this.totales = new Array<ValorHoras>;
    this.calcularTotales(this.agno1950);
    this.calcularTotales(this.agno789);
    this.calcularTotales(this.agno1846);
    this.calcularTotales(this.agno2101);
    this.calcularTotales(this.agno2025);

    this.liquidadorMesService.redonderar(this.agno1950);
    this.liquidadorMesService.redonderar(this.agno789);
    this.liquidadorMesService.redonderar(this.agno1846);
    this.liquidadorMesService.redonderar(this.agno2101);
    this.liquidadorMesService.redonderar(this.agno2025);

    let meses = new Array<ValorHoras>();
    //retornamos un arreglo que contiene todos los agños calculados. 
    meses = [...this.agno1950, ...this.agno789, ...this.agno1846, ...this.agno2101, ...this.agno2025];

    let barrasHorasPonderadas = undefined;
    let barrasTotal = this.generarBarrasSimpleDatos(this.totales);

    return new Agno(peticion.salario, meses, barrasTotal, barrasHorasPonderadas);
  }


  private calcularTotales(agno: ValorHoras[]) {
    //inicializo el total de horas a 0
    let total = structuredClone(this.configurationService.valorHoras);
    total.id = 13;
    total.label = CONST.total.label;
    total.name = CONST.total.id;
    total.reformaLabel = agno[0].reformaLabel;
    total.reformaName = agno[0].reformaName;
    total.reformaIndex = agno[0].reformaIndex
    total.style = agno[0].style;
    total.valorHora = agno[0].valorHora;
    agno.forEach(mes => {
      //totalizo las horas del año
      total.horasDiurnas += mes.horasDiurnas;
      total.horasNocturnas += mes.horasNocturnas;
      total.horasExtraDiurna += mes.horasExtraDiurna;
      total.horasExtraNocturna += mes.horasExtraNocturna;
      total.horasDiurnasDominicalesOFestivos += mes.horasDiurnasDominicalesOFestivos;
      total.horasNocturnasDominicalesFestivos += mes.horasNocturnasDominicalesFestivos;
      total.horasExtrasDiurnasDominicalesFestivas += mes.horasExtrasDiurnasDominicalesFestivas;
      total.horasExtrasNocturnasDominicalesFestivas += mes.horasExtrasNocturnasDominicalesFestivas;
      total.totalHoras += mes.totalHoras;
      //totalizo el valor de las horas del año
      total.valorHorasDiurnas += mes.valorHorasDiurnas;
      total.valorHorasNocturnas += mes.valorHorasNocturnas;
      total.valorHorasExtraDiurna += mes.valorHorasExtraDiurna;
      total.valorHorasExtraNocturna += mes.valorHorasExtraNocturna;
      total.valorHorasDiurnasDominicalesOFestivos += mes.valorHorasDiurnasDominicalesOFestivos;
      total.valorHorasNocturnasDominicalesFestivos += mes.valorHorasNocturnasDominicalesFestivos;
      total.valorHorasExtrasDiurnasDominicalesFestivas += mes.valorHorasExtrasDiurnasDominicalesFestivas;
      total.valorHorasExtrasNocturnasDominicalesFestivas += mes.valorHorasExtrasNocturnasDominicalesFestivas;
      total.totalValorHoras += mes.totalValorHoras;
    })
    //agregamos el total al final del año
    agno.push(total);
    this.totales.push(total);
  }



  /**GENERACIÓN DE DATOS PARA LOS GRÁFICOS  */

  private generarBarrasSimpleDatos(valorHoras: ValorHoras[]): BarrasSimpleDatos {
    //generar categorias: 
    let categorias = Array<string[]>();
    let colors = Array<string>();
    this.parametros.forEach(p => {
      categorias.push([p.reformaLabel, p.reformaAutor]);
      colors.push(p.colorFill);
    });
    //generar datos: 
    let data = Array<number>();

    valorHoras.forEach(vh => {
      data.push(vh.totalValorHoras);

    });
    return {
      chartLabel: "Ingreso Proyectado",
      dataLabel: "Ingreso",
      colors: colors,
      data: data,
      categories: categorias,
      labelColor: ['var(--GrapLabel)'],
      prefix: '',
      sufix: ' M',
      factor: 10000,
      decimales: 100,
      separador: '.'
    };
  }

}
