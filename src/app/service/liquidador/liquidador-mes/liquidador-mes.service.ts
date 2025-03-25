import { Injectable } from '@angular/core';
import { Parametros } from '../../../model/parametros/parametros';
import { Horas } from '../../../model/horas/horas';
import { ConfigurationService } from '../../configuration/configuration.service';
import { CONST } from '../../../model/conf/conf';


@Injectable({
  providedIn: 'root'
})
export class LiquidadorMesService {

  public configurationService: ConfigurationService;

  /**
   * Total horas semana por regimen
   */
  public input = new Array<Horas>();
  
  /**
   * La liquidación para el mes para cada uno de los regimenes 
   */
  public mes1950 = new Array<Horas>();
  public mes789 = new Array<Horas>();
  public mes2025 = new Array<Horas>();


  constructor(configurationService: ConfigurationService) {
    this.configurationService = configurationService;
  }

  public calcular(input: Horas[], parametros: Parametros, valorHora: number) {

    this.input = input;
    let factor = parametros.horasDiurnas;
    let festivos = Array<number>();

    console.log("valorHora:" + valorHora + " Factor:" + factor);
    this.liquidarHorasMesSinFestivos(CONST.horasDiurnas.id, CONST.horasDiurnas.label, true, CONST.diaDomingo, valorHora, factor, festivos);


    factor = parametros.horasNocturnas;
    this.liquidarHorasMesSinFestivos(CONST.horasNocturnas.id, CONST.horasNocturnas.label, false, CONST.diaDomingo, valorHora, factor, festivos);


    factor = parametros.horasDiurnasDominicalesOFestivos;
    this.liquidarHorasMesSinFestivos(CONST.horasDiurnasDominicalesOFestivos.id, CONST.horasDiurnasDominicalesOFestivos.label, true, CONST.diasSemanaLaboral, valorHora, factor, festivos);


    factor = parametros.horasNocturnasDominicalesFestivos;
    this.liquidarHorasMesSinFestivos(CONST.horasNocturnasDominicalesFestivos.id, CONST.horasNocturnasDominicalesFestivos.label, false, CONST.diasSemanaLaboral, valorHora, factor, festivos);


  }


  private liquidarHorasMesSinFestivos(id: string, label: string, diurnas: boolean, diasAOmitir: string[], valorHora: number, factor: number, festivos: number[]) {
    let horas = this.contarHorasSinFestivos(diasAOmitir, diurnas, festivos);
    let total = valorHora * horas;
    total = total + (total * factor);
    let hora = this.input.find(h => h.reforma === id);
    if (hora == null) {
      
    } else {
      
    }
  }


  private liquidarHorasMesSoloFestivos(id: string, label: string, diurnas: boolean, diasAOmitir: string[], valorHora: number, factor: number, festivos: number[]) {
    let horas = this.contarHorasSoloFestivos(diasAOmitir, diurnas, festivos);
    let total = valorHora * horas;
    total = total + (total * factor);
    let hora = this.input.find(h => h.reforma === id);
    if (hora == null) {
      
    } else {
      
    }
  }



  /**
   * 
   * @param diasAOmitir dias que se saltarán en el conteo, ej Domingo
   * @param diurnas True para contar horas diurnas, false para horas nocturnas
   * @returns las horas del mes que corresponden a los filtros. 
   */
  private contarHorasSinFestivos(diasAOmitir: string[], diurnas: boolean, festivos: number[]) {
    let horas = 0;
    for (let i = 0; i < 30; i++) {
      let df = festivos.find(f => f == i);
      if (df) { //Solo cuento los días NO festivos
        break;
      }
      let index = i % 7;
      let dia = this.input[index];
      //debo omitir los dias del arrelo
      let saltar = diasAOmitir.find(d => d === dia.name);
      if (!saltar) {
        if (diurnas) {
          horas = horas + dia.horasDiurnas;
        } else {
          horas = horas + dia.horasNocturnas;
        }
      }
    }
    return horas;
  }

  /**
   * 
   * @param diasAOmitir dias que se saltarán en el conteo, ej Domingo
   * @param diurnas True para contar horas diurnas, false para horas nocturnas
   * @param festivos Dias festivos a contar en el mes
   * @returns las horas del mes que corresponden a los filtros. 
   */
  private contarHorasSoloFestivos(diasAOmitir: string[], diurnas: boolean, festivos: number[]) {
    let horas = 0;
    for (let i = 0; i < 30; i++) {
      let df = festivos.find(f => f == i);
      if (!df) { //Solo cuento los días festivos
        break;
      }
      let index = i % 7;
      let dia = this.input[index];
      //debo omitir los dias del arrelo
      let saltar = diasAOmitir.find(d => d === dia.name);
      if (!saltar) {
        if (diurnas) {
          horas = horas + dia.horasDiurnas;
          //se debe contar máximo hasta la joranda laboral Ej 8 Horas
          //si pasa de ahí se debe contar como hora extra 
          //se deben tener en cuenta las horas totales del día 
        } else {
          horas = horas + dia.horasNocturnas;
        }
      }
    }
    return horas;
  }
}
