import { Injectable } from '@angular/core';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { ConfigurationService } from '../../configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';
import { Peticion } from '../../../model/peticion/peticion.model';
import { ValorHoras } from '../../../model/liquidacion/valor-horas/valor-horas';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { LiquidadorMesService } from '../liquidador-mes/liquidador-mes.service';


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
 * Horas registradas para cada semana
 */
  public semana1950 = new Array<HorasSemana>();
  public semana789 = new Array<HorasSemana>();
  public semana2025 = new Array<HorasSemana>();

  /**
   * Guarda la liquidación de los meses de un año y su total. 
   */
  public agno1950 = new Array<ValorHoras>;
  public agno789 = new Array<ValorHoras>;
  public agno2025 = new Array<ValorHoras>;

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
  public simularAngo(horasSemana: HorasSemana[], peticion: Peticion): ValorHoras[] {
    //Inicializa los arreglos que contienen las horas liquidadas por cada tipo de reforma
    this.llenarHorasTotalesPorSemanaYReforma(horasSemana);
    //Limpiar variables que almacenan la simulacion
    this.agno1950 = new Array<ValorHoras>;
    this.agno789 = new Array<ValorHoras>;
    this.agno2025 = new Array<ValorHoras>;
    //obtener el año que trae los parametros de
    let agno = this.configurationService.agnoModel;


    for (let i = 0; i < agno.meses.length; i++) {
      let mes1950 = this.liquidadorMesService.contarHorasMes(this.semana1950, agno.meses[i], peticion, CONST.reforma1950.index);
      this.agno1950.push(mes1950);
      let mes789 = this.liquidadorMesService.contarHorasMes(this.semana789, agno.meses[i], peticion, CONST.reforma789.index);
      this.agno789.push(mes789);
      let mes2025 = this.liquidadorMesService.contarHorasMes(this.semana2025, agno.meses[i], peticion, CONST.reforma2025.index);
      this.agno2025.push(mes2025);
    }
    
    this.calcularTotales(this.agno1950);
    this.calcularTotales(this.agno789);
    this.calcularTotales(this.agno2025);
    let agnos = new Array<ValorHoras>();
    //retornamos un arreglo que contiene todos los agños calculados. 
    agnos = [...this.agno1950, ...this.agno789, ...this.agno2025];
    return agnos;
  }

    /**
   * Filtra y llena las horas semanales por cada tipo de reforma que se usarán para calcular las horas mensuales
   * En este punto todos los arreglos deben empezar por el días lunes y terminar en total
   * @param horasSemana Arreglo con todas las horas semanales de los diferentes tipos de reformas
   */
    private llenarHorasTotalesPorSemanaYReforma(horasSemana: HorasSemana[]) {
      this.semana1950 = horasSemana.filter(h => (h.reformaName === CONST.reforma1950.reforma));
      this.semana789 = horasSemana.filter(h => (h.reformaName === CONST.reforma789.reforma));
      this.semana2025 = horasSemana.filter(h => (h.reformaName === CONST.reforma2025.reforma));
    }


  private calcularTotales(agno: ValorHoras[]) {
    //inicializo el total de horas a 0
    let total = structuredClone(this.configurationService.valorHoras);
    total.id = 13;
    total.label = CONST.totalLabel;
    total.name = CONST.totalName;
    total.reformaLabel = agno[0].reformaLabel;
    total.reformaName = agno[0].reformaName;
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
  }

}
