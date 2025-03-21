import { Injectable } from '@angular/core';
import { Parametros } from '../../model/parametros/parametros';
import { Hora } from '../../model/hora/hora';
import { Mes } from '../../model/mes/mes';
import { Dia } from '../../model/dia/dia';
import { CONST } from '../../model/conf/conf';

@Injectable({
  providedIn: 'root'
})
export class MesService {

  public horas = new Array<Hora>();
  public semana = new Array<Dia>();


  constructor() { }

  public calcular(semana: Dia[], parametros: Parametros, valorHora: number): Mes {

    this.semana = semana;
    let factor = parametros.horasDiurnas;
    let festivos = Array<number>();
    
    console.log("valorHora:" + valorHora + " Factor:" + factor);
    this.liquidarHorasMesSinFestivos(CONST.horasDiurnas.id, CONST.horasDiurnas.label, true, CONST.diaDomingo, valorHora, factor, festivos);


    factor = parametros.horasNocturnas;
    this.liquidarHorasMesSinFestivos(CONST.horasNocturnas.id, CONST.horasNocturnas.label, false, CONST.diaDomingo, valorHora, factor, festivos);


    factor = parametros.horasDiurnasDominicalesOFestivos;
    this.liquidarHorasMesSinFestivos(CONST.horasDiurnasDominicalesOFestivos.id, CONST.horasDiurnasDominicalesOFestivos.label, true, CONST.diasSemanaLaboral, valorHora, factor , festivos);


    factor = parametros.horasNocturnasDominicalesFestivos;
    this.liquidarHorasMesSinFestivos(CONST.horasNocturnasDominicalesFestivos.id, CONST.horasNocturnasDominicalesFestivos.label, false, CONST.diasSemanaLaboral, valorHora, factor, festivos);



    return new Mes('Mes1', semana, this.horas);
  }


  private liquidarHorasMesSinFestivos(id: string, label: string, diurnas: boolean, diasAOmitir: string[], valorHora: number, factor: number, festivos:number[]) {
    let horas = this.contarHorasSinFestivos(diasAOmitir, diurnas, festivos);
    let total = valorHora * horas;
    total = total + (total * factor);
    let hora = this.horas.find( h => h.tipo === id);
    if(hora == null){
      hora = new Hora(id, label, horas, factor, total);
      this.horas.push(hora);
    }else{
      hora.cantidad = horas;
      hora.factor = factor;
      hora.total = total;
    }
  }


  private liquidarHorasMesSoloFestivos(id: string, label: string, diurnas: boolean, diasAOmitir: string[], valorHora: number, factor: number, festivos:number[]) {
    let horas = this.contarHorasSoloFestivos(diasAOmitir, diurnas, festivos);
    let total = valorHora * horas;
    total = total + (total * factor);
    let hora = this.horas.find( h => h.tipo === id);
    if(hora == null){
      hora = new Hora(id, label, horas, factor, total);
      this.horas.push(hora);
    }else{
      hora.cantidad = horas;
      hora.factor = factor;
      hora.total = total;
    }
  }



  /**
   * 
   * @param diasAOmitir dias que se saltarán en el conteo, ej Domingo
   * @param diurnas True para contar horas diurnas, false para horas nocturnas
   * @returns las horas del mes que corresponden a los filtros. 
   */
  private contarHorasSinFestivos(diasAOmitir: string[], diurnas: boolean, festivos : number[]) {
    let horas = 0;
    for (let i = 0; i < 30; i++) {
      let df = festivos.find( f => f == i);
      if(df){ //Solo cuento los días NO festivos
        break;
      }
      let index = i % 7;
      let dia = this.semana[index];
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
  private contarHorasSoloFestivos(diasAOmitir: string[], diurnas: boolean, festivos : number[]) {
    let horas = 0;
    for (let i = 0; i < 30; i++) {
      let df = festivos.find( f => f == i);
      if(!df){ //Solo cuento los días festivos
        break;
      }
      let index = i % 7;
      let dia = this.semana[index];
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
