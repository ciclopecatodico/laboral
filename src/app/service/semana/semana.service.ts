import { Injectable } from '@angular/core';
import { Dia } from '../../model/dia/dia';
import { Peticion } from '../../model/peticion/peticion.model';
import { Parametros } from '../../model/parametros/parametros';
import moment from 'moment';
import { ConfigurationService } from '../configuration/configuration.service';
import { Turno } from '../../model/turno/turno';




@Injectable({
  providedIn: 'root'
})
export class SemanaService {

  public configurationService : ConfigurationService;
  public semana : Dia[];

  constructor(configurationService : ConfigurationService) { 
    this.configurationService = configurationService; 
    this.semana = configurationService.semana;
  }

  public calcularSemana(peticion: Peticion, parametro: Parametros): Dia[] {
    this.semana = structuredClone(this.configurationService.semana);
    if (peticion.turnos) {
      for (let turno of peticion.turnos) {
        if (turno.dias) {
          console.log("Turno :",JSON.stringify(turno));
          this.calcularTiposDeHoras(turno, parametro);
          console.log("Semana :", JSON.stringify(this.semana));
        }
      }
    }
    return this.semana;
  }


  private calcularTiposDeHoras(turno: Turno, parametro: Parametros) {
    let horario = [turno.inicio, turno.fin];
    let jornadaDiurna = [parametro.diaInicio, parametro.diaFin];
    let jornadaNocturna1 = ["12:00 AM", parametro.nocheFin];
    let jornadaNocturna2 = [parametro.nocheInicio, "11:59 PM"];
    let horasDiurnas = 0;
    let horasExtrasDiurnas = 0;
    let horasNocturnas = 0;
    let horasExtraNocturnas = 0;
    //calculo las horas nocturnas en la madrugada
    let horasNocturnas1 = this.calcularHorasDentroDelTurno(horario, jornadaNocturna1);
    console.log("horasNocturnas1:"+horasNocturnas1);
    horasNocturnas = horasNocturnas1;
    //calculo las horas del turno de dia
    let horasDiurnas1 = this.calcularHorasDentroDelTurno(horario, jornadaDiurna);
    console.log("horasDiurnas1:"+horasDiurnas1);
    let horasTotales = horasNocturnas1 + horasDiurnas1;
    if (horasTotales > parametro.jornadaLaboralDiaria) {
      //Habría horas extras diurnas así: 
      horasExtrasDiurnas = horasTotales - parametro.jornadaLaboralDiaria;
      horasDiurnas = horasDiurnas1 - horasExtrasDiurnas;
    }else{
      horasDiurnas = horasDiurnas1;
    }
    //calculo las horas nocturnas en la noche
    let horasNocturnas2 = this.calcularHorasDentroDelTurno(horario, jornadaNocturna2);
    console.log("horasNocturnas2:"+horasNocturnas2);
    horasTotales = horasNocturnas1 + horasDiurnas1 + horasNocturnas2;
    if (horasTotales > parametro.jornadaLaboralDiaria) {
      horasExtraNocturnas = horasTotales - parametro.jornadaLaboralDiaria;
      horasExtraNocturnas = horasExtraNocturnas - horasExtrasDiurnas;
    }else{
      horasNocturnas = horasNocturnas1 + horasNocturnas2;
    }

    turno.dias?.forEach(
      dia => {
        this.guardarDia(dia, horario, horasDiurnas, horasNocturnas, horasExtrasDiurnas, horasExtraNocturnas);
      }
    );
  }

  public guardarDia(nombre: string, jornada: string[], horasDiurnas: number, horasNocturnas: number, horasExtraDiurna:number, horasExtraNocturna:number) {
    let horario = jornada[0] + "-" + jornada[1];
    if (this.semana) {
      let dia = this.semana.find(d => d.name === nombre);
      if (dia) {
        //verificar si existe el horario
        let element = dia.horarios.find( k => k === horario);
        if(!element){
          //si no ha sido guardado lo agregamos
          dia.horarios.push(horario); //agregamos el horario 
        }
        dia.horasDiurnas += horasDiurnas; 
        dia.horasExtraDiurna += horasExtraDiurna; 
        dia.horasNocturnas += horasNocturnas; 
        dia.horasExtraNocturna += horasExtraNocturna; 
        dia.totalHoras = dia.horasDiurnas + dia.horasNocturnas + dia.horasExtraDiurna + dia.horasExtraNocturna;
      } else {
        let totalHoras = horasDiurnas+horasNocturnas+horasExtraDiurna+horasExtraNocturna;
        dia = new Dia(nombre, [horario], horasDiurnas, horasNocturnas, horasExtraDiurna, horasExtraNocturna, totalHoras);
        this.semana.push(dia);
      }
    }
  }

  /**
   * Calcula las horas que trabajó una persona dentro de las Jornadas 
   * @param horario Horas en las que trabajó la persona EJ: ['02:00 PM','10:00 PM']
   * @param jornada laboral, EJ Jornada diurna ['06:00 AM','06:00 PM']
   * @returns Horas del horario dento de la jornada, para los ejemplos 4horas ['02:00 PM','06:00 PM']
   * las horas posteriores al turno deberán ser contadas por otro llamado que cuente las horas en jornada nocturna ['06:00 PM','06:00 AM']
   */
  public calcularHorasDentroDelTurno(horario: string[], jornada: string[]) : number{
    let horarioInicio = moment(horario[0], 'hh:mm a');
    let horarioFin = moment(horario[1], 'hh:mm a');
    let jornadaInicio = moment(jornada[0], 'hh:mm a');
    let jornadaFin = moment(jornada[1], 'hh:mm a');
    //Horas  del turno estan dentro de la jornada diurna
    let horas = 0;
    if (horarioInicio.isAfter(jornadaInicio)) {
      if (horarioFin.isAfter(jornadaFin)) {
        horas = jornadaFin.diff(horarioInicio, 'hours');
      } else {
        horas = horarioFin.diff(horarioInicio, 'hours');
      }
    } else {
      if (horarioFin.isAfter(jornadaFin)) {
        horas = jornadaFin.diff(jornadaInicio, 'hours');
      } else {
        horas = horarioFin.diff(jornadaInicio, 'hours');
      }
    }
    //Corrige el caso especial, se calcula el turno con el horario opuesto
    //Ej Calculamos el horario de día con el turno de noche 
    if (horas > 0) {
      return horas;
    }
    return 0;
  }



}
