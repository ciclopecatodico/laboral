import { Injectable } from '@angular/core';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { ConfigurationService } from '../../configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';
import { Peticion } from '../../../model/peticion/peticion.model';
import { MesModel } from '../../../model/modelos-simulacion/mes-model/mes-model';
import { AgnoModel } from '../../../model/modelos-simulacion/agno-model/agno-model';
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
  public liquidadorMesService : LiquidadorMesService;

  public parametros: Parametros[];

  /**
   * Total horas semana por regimen
   */
  public input = new Array<HorasSemana>();

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

  constructor(configurationService: ConfigurationService, liquidadorMesService : LiquidadorMesService) {
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
    this.llenarHorasTotalesPorSemanaYReforma(horasSemana);
    let agno = this.configurationService.agnoModel;

    
    for(let i = 0; i<agno.meses.length; i++){
      let mes1950 = this.liquidadorMesService.contarHorasMes(horasSemana, agno.meses[i], peticion, 0);
      this.agno1950.push(mes1950);
    }
    return this.agno1950; 
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




}
