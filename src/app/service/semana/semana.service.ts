import { Injectable } from '@angular/core';
import { Dia } from '../../model/dia/dia';
import { Peticion } from '../../model/peticion/peticion.model';
import { Parametros } from '../../model/parametros/parametros';
import moment from 'moment';
import { ConfigurationService } from '../configuration/configuration.service';




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
    //console.log("parametro:", JSON.stringify(parametro));
    this.semana = this.configurationService.semana;
    if (peticion.turnos) {
      for (let turno of peticion.turnos) {
        if (turno.dias) {
          let horario = [turno.inicio, turno.fin];
          let jornadaDiurna = [parametro.diaInicio, parametro.diaFin];
          this.calcularHorasDiurnas(jornadaDiurna, horario, turno.dias);
          let jornadaNocturna1 = [parametro.nocheInicio, "11:59 PM"];
          this.calcularHorasNocturnas(jornadaNocturna1, horario, turno.dias);
          let jornadaNocturna2 = ["12:00 AM", parametro.nocheFin];
          this.calcularHorasNocturnas(jornadaNocturna2, horario, turno.dias);
        }
      }
    }
    return this.semana;
  }


  public calcularHorasDiurnas(jornada: string[], horario: string[], dias: string[]) {
    let horasDiurnas = this.calcularHorasDentroDelTurno(horario, jornada);
    dias?.forEach(
      dia => {
        this.guardarDia(dia, horario, horasDiurnas, 0);
      }
    );
  }

  public calcularHorasNocturnas(jornada: string[], horario: string[], dias: string[]) {
    let horasNocturnas = this.calcularHorasDentroDelTurno(horario, jornada);
    dias?.forEach(
      dia => {
        this.guardarDia(dia, horario, 0, horasNocturnas);
      }
    );
  }


  public guardarDia(nombre: string, jornada: string[], horasDiurnas: number, horasNocturnas: number) {
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
        dia.horasDiurnas = dia.horasDiurnas + horasDiurnas;
        dia.horasNocturnas = dia.horasNocturnas + horasNocturnas;
      } else {
        dia = new Dia(nombre, [horario], horasDiurnas, horasNocturnas);
        this.semana.push(dia);
      }
    }
  }

  public calcularHorasDentroDelTurno(horario: string[], jornada: string[]) {
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
