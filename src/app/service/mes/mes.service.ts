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

    console.log("1 Semana:", JSON.stringify(this.semana));

    let factor = parametros.horasDiurnas;
    console.log("valorHora:" + valorHora + " Factor:" + factor);
    this.calcularHoras(CONST.horasDiurnas.id, CONST.horasDiurnas.label, true, CONST.diaDomingo, valorHora, factor);

    // console.log("2 Semana:", JSON.stringify(this.semana));
    // factor = parametros.horasNocturnas;
    // this.calcularHoras(CONST.horasNocturnas.id, CONST.horasNocturnas.label, false, CONST.diaDomingo, valorHora, factor);

    // console.log("3 Semana:", JSON.stringify(this.semana));
    // factor = parametros.horasDiurnasDominicalesOFestivos;
    // this.calcularHoras(CONST.horasDiurnasDominicalesOFestivos.id, CONST.horasDiurnasDominicalesOFestivos.label, true, CONST.diasSemanaLaboral, valorHora, factor);

    // console.log("4 Semana:", JSON.stringify(this.semana));
    // factor = parametros.horasNocturnasDominicalesFestivos;
    // this.calcularHoras(CONST.horasNocturnasDominicalesFestivos.id, CONST.horasNocturnasDominicalesFestivos.label, false, CONST.diasSemanaLaboral, valorHora, factor);

    return new Mes('Mes1', semana, this.horas);
  }


  private calcularHoras(id: string, label: string, diurnas: boolean, omitir: string[], valorHora: number, factor: number) {
    let horas = this.contarHoras(omitir, diurnas);
    let total = valorHora * horas;
    total = total + (total * factor);
    let hora = new Hora(id, label, horas, factor, total);
    this.horas.push(hora);
  }

  /**
   * Cuenta las horas para 30 días laborales
   * @param omitirDias Días a omitir en el conteo, ej Domingo
   * @param diurnas true para horas Diurnas, false para horas nocturnas
   * @returns las horas del mes que corresponden a los filtros. 
   */
  private contarHoras(omitirDias: string[], diurnas: boolean) {
    let horas = 0;
    for (let i = 0; i < 30; i++) {
      let index = i % 7;
      let dia = this.semana[index];
      let saltar = omitirDias.find(d => d === dia.name);
      //console.log("Saltar:"+saltar);
      if (saltar) {
        //console.log("dia:"+dia.name);
        if (diurnas) {
          horas = horas + dia.horasDiurnas;
        } else {
          horas = horas + dia.horasNocturnas;
        }
      }
    }
    return horas;
  }
}
