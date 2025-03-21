import { Injectable } from '@angular/core';
import { Horas } from '../../model/horas/horas';
import { Peticion } from '../../model/peticion/peticion.model';
import { Parametros } from '../../model/parametros/parametros';
import moment from 'moment';
import { ConfigurationService } from '../configuration/configuration.service';
import { Turno } from '../../model/turno/turno';
import { List } from '../../model/listas/list';
import { CONST } from '../../model/conf/conf';




@Injectable({
  providedIn: 'root'
})
export class SemanaService {

  public configurationService: ConfigurationService;
  public list = new List();
  public horas: Horas[];

  constructor(configurationService: ConfigurationService) {
    this.configurationService = configurationService;
    this.horas = configurationService.semana;
  }

  public calcularSemana(peticion: Peticion, parametro: Parametros): Horas[] {
    this.horas = structuredClone(this.configurationService.semana);
    if (peticion.turnos) {
      for (let turno of peticion.turnos) {
        if (turno.dias != null && turno.dias.length > 0) {
          this.calcularTiposDeHoras(turno, parametro);
          //console.log("Semana :", JSON.stringify(this.horas));
        }
      }
    }
    return this.horas;
  }


  private calcularTiposDeHoras(turno: Turno, parametro: Parametros) {
    let horario = [turno.inicio, turno.fin];
    console.log("Turno : [" + turno.inicio + "-" + turno.fin + "]");
    let jornadaDiurna = [parametro.diaInicio, parametro.diaFin];
    let jornadaNocturna1 = ["00:00", parametro.nocheFin];
    let jornadaNocturna2 = [parametro.nocheInicio, CONST.mediaNoche];
    let horasDiurnas = 0;
    let horasExtrasDiurnas = 0;
    let horasNocturnas = 0;
    let horasExtraNocturnas = 0;
    //calculo las horas nocturnas en la madrugada
    let horasNocturnas1 = this.calcularHorasDentroDelTurno(horario, jornadaNocturna1);
    console.log("horasNocturnas1: " + horasNocturnas1);
    horasNocturnas = horasNocturnas1;
    console.log("horasNocturnas>>>: " + horasNocturnas);
    //calculo las horas del turno de dia
    let horasDiurnas1 = this.calcularHorasDentroDelTurno(horario, jornadaDiurna);
    console.log("horasDiurnas1: " + horasDiurnas1);
    let horasTotales = horasNocturnas1 + horasDiurnas1;
    if (horasTotales > parametro.jornadaLaboralDiaria) {
      //Habría horas extras diurnas así: 
      horasExtrasDiurnas = horasTotales - parametro.jornadaLaboralDiaria;
      horasDiurnas = horasDiurnas1 - horasExtrasDiurnas;
    } else {
      horasDiurnas = horasDiurnas1;
    }
    console.log("horasNocturnas>>>: " + horasNocturnas);
    //calculo las horas nocturnas en la noche
    let horasNocturnas2 = this.calcularHorasDentroDelTurno(horario, jornadaNocturna2);
    console.log("horasNocturnas2: " + horasNocturnas2);
    horasTotales = horasNocturnas1 + horasDiurnas1 + horasNocturnas2;
    console.log("horasTotales: " + horasTotales);
    console.log("horasNocturnas>>>: " + horasNocturnas);
    if (horasTotales > parametro.jornadaLaboralDiaria) {
      horasExtraNocturnas = horasTotales - parametro.jornadaLaboralDiaria;
      horasExtraNocturnas = horasExtraNocturnas - horasExtrasDiurnas;
      horasNocturnas = (horasNocturnas1 + horasNocturnas2) - horasExtraNocturnas;
    } else {
      console.log("horasNocturnas1>>>: " + horasNocturnas1 );
      console.log("horasNocturnas2>>>: " + horasNocturnas2 );
      horasNocturnas = horasNocturnas1 + horasNocturnas2;
    }
    console.log("horasDiurnas>>>: " + horasDiurnas);

    turno.dias?.forEach(
      dia => {
        this.guardarDia(dia, horario, horasDiurnas, horasNocturnas, horasExtrasDiurnas, horasExtraNocturnas, parametro.jornadaLaboralDiaria);
      }
    );
  }

  public guardarDia(nombre: string, jornada: string[], horasDiurnas: number, horasNocturnas: number, horasExtraDiurna: number, horasExtraNocturna: number, jornadaLaboralDiaria:number) {
    let horario = jornada[0] + "-" + jornada[1];
    let horas = this.horas.find(d => d.name === nombre);
    if (this.horas) {
      if (horas) {
        //verificar si existe el horario
        let element = horas.horarios.find(k => k === horario);
        if (!element) {
          //si no ha sido guardado lo agregamos
          horas.horarios.push(horario); //agregamos el horario 
        }
        //Casos especiales en el acumulador de horas  //TODO here
        horas.horasDiurnas += horasDiurnas;
        horas.horasExtraDiurna += horasExtraDiurna;
        horas.horasNocturnas += horasNocturnas;
        horas.horasExtraNocturna += horasExtraNocturna;
        horas.totalHoras = horas.horasDiurnas + horas.horasNocturnas + horas.horasExtraDiurna + horas.horasExtraNocturna;
      } else {
        let totalHoras = horasDiurnas + horasNocturnas + horasExtraDiurna + horasExtraNocturna;
        //TODO cambiar nombre por label!
        let dia = this.list.dias.find(d => d.id === nombre);
        let label = nombre;
        if (dia) {
          console.log("LABEL >>>>", label);
          label = dia.label + '';
        }
        horas = new Horas(nombre, label, [horario], horasDiurnas, horasNocturnas, horasExtraDiurna, horasExtraNocturna, 0, 0, 0, 0, totalHoras);
        this.horas.push(horas);
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
  public calcularHorasDentroDelTurno(horario: string[], jornada: string[]): number {
    let horarioInicio = moment(horario[0], 'hh:mm a');
    let horarioFin;
    if (horario[1] === CONST.mediaNoche) {
      horarioFin = moment('00:00', 'hh:mm').add(1, 'd');
    } else {
      horarioFin = moment(horario[1], 'hh:mm a');
    }
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
        // console.log("jornadaInicio:", JSON.stringify(jornadaInicio));
        // console.log("horarioFin:", JSON.stringify(horarioFin));
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
