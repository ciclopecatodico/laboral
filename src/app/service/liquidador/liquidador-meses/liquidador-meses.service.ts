import { Injectable } from '@angular/core';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { ConfigurationService } from '../../configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';
import { Peticion } from '../../../model/peticion/peticion.model';
import { MesModel } from '../../../model/modelos-simulacion/mes-model/mes-model';
import { AgnoModel } from '../../../model/modelos-simulacion/agno-model/agno-model';


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
  public agno1950 = new Array<[]>;

  constructor(configurationService: ConfigurationService) {
    this.configurationService = configurationService;
  }

  /**
   * Calcula el valor de un mes para todas las reformas 
   * @param horasSemana 
   * @param peticion 
   */
  public simularAngo(horasSemana: HorasSemana[], peticion: Peticion) {
    //parametroIndex: number
    //this.input = horasSemana;
    this.llenarHorasTotalesPorSemanaYReforma(horasSemana);
    //console.log("Semana:",JSON.stringify(this.semana1950));

    let agno = this.configurationService.agnoModel;
    let agno2 = new AgnoModel(1,'', agno.meses);
    console.log("Agno:", JSON.stringify(agno));
    //let mes = agno.;
    
    //console.log("Meses: ", JSON.stringify(mes));
    //this.contarHorasMes(horasSemana, mes)
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


  /**
   * Cuenta las horas de un mes 
   * @param horasSemana 
   */
  private contarHorasMes(horasSemana: HorasSemana[], mes: MesModel) {
    let mes2 = new MesModel(1,'','','',[1],2);
    
    //liquida los días empezando por el primer día del mes
    //Todos los meses se liquidan a 30 días
    //let diaIndex = CONST.diasSemanaName.findIndex( d => d === mes.diaInicial)
    for(let i=0; i<CONST.diasMes; i++){
      //let j  = (i + diaIndex) % 7;
      
    }

    //debe tener en cuenta si el día es domingo

    //debe tener en cuenta si el día es festivo

  }



}
