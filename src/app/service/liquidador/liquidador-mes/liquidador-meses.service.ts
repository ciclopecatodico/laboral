import { Injectable } from '@angular/core';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { ConfigurationService } from '../../configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';
import { Peticion } from '../../../model/peticion/peticion.model';
import { MesModel } from '../../../model/modelos-simulacion/mes-model/mes-model';


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
  public calcular(horasSemana: HorasSemana[], peticion: Peticion) {
    //parametroIndex: number
    //this.input = horasSemana;
    this.llenarHorasTotalesPorSemanaYReforma(horasSemana);
    
    
    
    
    //console.log("1950", JSON.stringify(this.semana1950));

    // let factor = parametros.horasDiurnas;
    // let festivos = Array<number>();

    // console.log("valorHora:" + valorHora + " Factor:" + factor);
    // this.liquidarHorasMesSinFestivos(CONST.horasDiurnas.id, CONST.horasDiurnas.label, true, CONST.diaDomingo, valorHora, factor, festivos);


    // factor = parametros.horasNocturnas;
    // this.liquidarHorasMesSinFestivos(CONST.horasNocturnas.id, CONST.horasNocturnas.label, false, CONST.diaDomingo, valorHora, factor, festivos);


    // factor = parametros.horasDiurnasDominicalesOFestivos;
    // this.liquidarHorasMesSinFestivos(CONST.horasDiurnasDominicalesOFestivos.id, CONST.horasDiurnasDominicalesOFestivos.label, true, CONST.diasSemanaLaboral, valorHora, factor, festivos);


    // factor = parametros.horasNocturnasDominicalesFestivos;
    // this.liquidarHorasMesSinFestivos(CONST.horasNocturnasDominicalesFestivos.id, CONST.horasNocturnasDominicalesFestivos.label, false, CONST.diasSemanaLaboral, valorHora, factor, festivos);


  }

  /**
   * Filtra y llena las horas semanales por cada tipo de reforma que se usarán para calcular las horas mensuales
   * @param horasSemana Arreglo con todas las horas semanales de los diferentes tipos de reformas
   */
  private llenarHorasTotalesPorSemanaYReforma(horasSemana: HorasSemana[]){
    this.semana1950 = horasSemana.filter( h => (h.reformaName === CONST.reforma1950.reforma));
    this.semana789 = horasSemana.filter( h => (h.reformaName === CONST.reforma789.reforma));
    this.semana2025 = horasSemana.filter( h => (h.reformaName === CONST.reforma2025.reforma));
  }


  /**
   * Cuenta las horas de un mes 
   * @param horasSemana 
   */
  private contarHorasMes(horasSemana: HorasSemana[], mes: MesModel){

    //liquida los días empezando por el primer día del mes ñ

    //debe tener en cuenta si el día es domingo 

    //debe tener en cuenta si el día es festivo 

  }
  
}
