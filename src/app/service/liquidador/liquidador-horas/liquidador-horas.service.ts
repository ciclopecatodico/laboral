import { Injectable } from '@angular/core';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { Peticion } from '../../../model/peticion/peticion.model';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import moment from 'moment';
import { ConfigurationService } from '../../configuration/configuration.service';
import { Turno } from '../../../model/turno/turno';
import { List } from '../../../model/listas/list';
import { CONST } from '../../../model/const/CONST';
import { Dona } from '../../../model/graficos/dona/dona';


/**
 * Calcula las horas para cada día por tipo para las jornadas definidas en las reformas. 
 */
@Injectable({
  providedIn: 'root'
})
export class LiquidadorHorasService {

  public configurationService: ConfigurationService;
  public list = new List();
  public horasList: HorasSemana[];
  public parametros: Parametros[];
  public charts: Dona[];

  constructor(configurationService: ConfigurationService) {
    this.configurationService = configurationService;
    this.horasList = configurationService.semana;
    this.parametros = configurationService.parametros;
    this.charts = [];
  }

  public calcularSemana(peticion: Peticion, parametroId: number): HorasSemana[] {
    let parametros = this.parametros[parametroId];
    //asigno a la petición el valor del salario del último parámetro utilizado 2025
    peticion.salario = (parametros.smlv/parametros.jornadaLaboralMensual);
    this.horasList = structuredClone(this.configurationService.semana);
    this.horasList.forEach(h => {
      h.reformaName = parametros.reformaName;
      h.reformaLabel = parametros.reformaLabel
      h.style = parametros.style;
    });
    //calcula las horas por tipo día a día 
    if (peticion.turnos) {
      //calculas las horas diurnas por tipo de hora día a día 
      for (let turno of peticion.turnos) {
        if (turno.dias != null && turno.dias.length > 0) {
          this.calcularTiposDeHoras(turno, parametros);
        }
      }
      //luego de calcular las horas diariamente 
      //calculo las horas extra semanales
      //la prueba es que las horas que superen la jornada semanal pasarán a ser horas extra
      this.calcularHorasExtraSemanales(parametros);
    }
    //calcula 
    this.redonderar(this.horasList);
    return this.horasList;
  }


  /**
   * Calcula los tipos de hora día a día y solo cuenta como horas extras aquellas que 
   * superen la jornada díaria, en general 8 H 
   */
  private calcularTiposDeHoras(turno: Turno, parametro: Parametros) {
    let horario = [turno.inicio, turno.fin];
    let jornadaDiurna = [parametro.diaInicio, parametro.diaFin];
    let jornadaNocturna1 = ["00:00", parametro.nocheFin];
    let jornadaNocturna2 = [parametro.nocheInicio, CONST.mediaNoche];
    let horasDiurnas = 0;
    let horasExtrasDiurnas = 0;
    let horasNocturnas = 0;
    let horasExtraNocturnas = 0;
    //calculo las horas nocturnas en la madrugada
    let horasNocturnas1 = this.calcularHorasDentroDelTurno(horario, jornadaNocturna1);
    horasNocturnas = horasNocturnas1;
    //calculo las horas del turno de dia
    let horasDiurnas1 = this.calcularHorasDentroDelTurno(horario, jornadaDiurna);
    let horasTotales = horasNocturnas1 + horasDiurnas1;
    //console.log("JornadaLaboralDiaria:", parametro.jornadaLaboralDiaria);
    if (horasTotales > parametro.jornadaLaboralDiaria) {
      //Habría horas extras diurnas así: 
      horasExtrasDiurnas = horasTotales - parametro.jornadaLaboralDiaria;
      horasDiurnas = horasDiurnas1 - horasExtrasDiurnas;
    } else {
      horasDiurnas = horasDiurnas1;
    }
    //calculo las horas nocturnas en la noche
    let horasNocturnas2 = this.calcularHorasDentroDelTurno(horario, jornadaNocturna2);
    horasTotales = horasNocturnas1 + horasDiurnas1 + horasNocturnas2;
    if (horasTotales > parametro.jornadaLaboralDiaria) {
      horasExtraNocturnas = horasTotales - parametro.jornadaLaboralDiaria;
      horasExtraNocturnas = horasExtraNocturnas - horasExtrasDiurnas;
      horasNocturnas = (horasNocturnas1 + horasNocturnas2) - horasExtraNocturnas;
    } else {
      horasNocturnas = horasNocturnas1 + horasNocturnas2;
    }
    // console.log("horasDiurnas:", horasDiurnas);
    // console.log("horasNocturnas:", horasNocturnas);
    // console.log("horasExtrasDiurnas:", horasExtrasDiurnas);
    // console.log("horasExtraNocturnas:", horasExtraNocturnas);
    turno.dias?.forEach(
      dia => {
        this.guardarDia(dia, parametro.reformaName, parametro.reformaLabel, parametro.style, horario, horasDiurnas, horasNocturnas, horasExtrasDiurnas, horasExtraNocturnas, parametro.jornadaLaboralDiaria, parametro.maximoHorasExtras);
      }
    );
  }


  /**
   * Calcula las horas extras utilizando como parámetro las jornada semanal 
   * Tomará las horas del último día registrado y las contará como extras 
   * tantas como superen la jornada semanal; 
   */
  private calcularHorasExtraSemanales(parametro: Parametros) {
    //contamos las horas diarias totales para obtener la jornada semanal.
    let jornadaSemanal = 0;
    this.horasList.forEach(hs => {
      jornadaSemanal += hs.horasDiurnas;
      jornadaSemanal += hs.horasExtraDiurna;
      jornadaSemanal += hs.horasNocturnas;
      jornadaSemanal += hs.horasExtraNocturna;
    });
    //Itero las horas semanales desde el último elemento hacia atrás.
    let horasExtraSemanales = jornadaSemanal - parametro.jornadaLaboralSemanal;
    for(let i = this.horasList.length - 1 ; i >=0 ; i--){
      //Si la sumatoria de las horas semanales supera la jornada semanal:
      if (jornadaSemanal > parametro.jornadaLaboralSemanal) {
        //convierto las horas en horas extra empezando por horas diurnas
        let horasNocturnas = this.horasList[i].horasNocturnas;
        if(horasNocturnas > 0 ){
          //si las horas extra que debo agregar son menores que las horas nocturnas
          //Empiezo por las horas nocturnas puesto que es más probable que éstas se 
          //hayan convertido en horas extras ya que son posteriores a las horas diurnas
          //TODO el caso especial de Jornada Nocturna queda pendiente.
          if(horasNocturnas >= horasExtraSemanales){
            // Caso en el que agoto las horas extras 
            this.horasList[i].horasExtraNocturna = horasExtraSemanales;
            // Descuento estras horas que volví extra de las ordinarias:
            this.horasList[i].horasNocturnas -=horasExtraSemanales
            horasExtraSemanales = 0;
          }else{
            // Casso en el que debo arrastrar algunas horas extra: 
            let horasExtra = horasExtraSemanales - horasNocturnas;
            this.horasList[i].horasExtraNocturna += horasNocturnas;
            // Descuento estras horas que volví extra de las ordinarias:
            this.horasList[i].horasNocturnas = 0
            horasExtraSemanales = horasExtra;
          }
        }
        //luego de descontar de las horas nocturnas y agregarlo a las extras nocturnas
        //debo hacer lo mismo con las horas diurnas con el excedente de horas semanales
        let horasDiurnas = this.horasList[i].horasDiurnas;
        if(horasDiurnas > 0 ){
          if(horasDiurnas >= horasExtraSemanales){
            // Caso en el que agoto las horas extras 
            this.horasList[i].horasExtraDiurna = horasExtraSemanales;
            // Descuento estras horas que volví extra de las ordinarias:
            this.horasList[i].horasDiurnas -=horasExtraSemanales
            horasExtraSemanales = 0;
          }else{
            // Casso en el que debo arrastrar algunas horas extra: 
            let horasExtra = horasExtraSemanales - horasDiurnas;
            this.horasList[i].horasExtraDiurna += horasDiurnas;
            // Descuento estras horas que volví extra de las ordinarias:
            this.horasList[i].horasDiurnas = 0
            horasExtraSemanales = horasExtra;
          }
        }
      }
    }


  }

  public guardarDia(nombre: string, reformaName: string, reformaLabel: string, style: string, jornada: string[], horasDiurnas: number, horasNocturnas: number, horasExtraDiurna: number, horasExtraNocturna: number, jornadaLaboralDiaria: number, maximoHorasExtras: number) {
    let horario = jornada[0] + "-" + jornada[1];
    let horas = this.horasList.find(d => d.name === nombre);
    if (horas) {
      //verificar si existe el horario
      let element = horas.horarios.find(k => k === horario);
      if (!element) {
        //si no ha sido guardado lo agregamos
        horas.horarios.push(horario); //agregamos el horario 
      }
      //Casos especiales en el acumulador de horas  //TODO here
      let sumaHorasDiurnas = horas.horasDiurnas + horasDiurnas;
      let sumaHorasExtrasDiurnas = horas.horasExtraDiurna + horasExtraDiurna
      let sumaHorasNocturnas = horas.horasNocturnas + horasNocturnas;
      let sumaHorasExtrasNocturnas = horas.horasExtraNocturna + horasExtraNocturna;
      //Acumulamos las horas diurnas de los diferentes turnos 
      //este proceso puede superar la jornada diaria
      if (sumaHorasDiurnas > jornadaLaboralDiaria) {
        //si supera la jornada diaria debemos dejar la jornada máxima
        horas.horasDiurnas = jornadaLaboralDiaria;
        //y calcular las horas extras diurnas 
        let horasExtra = sumaHorasDiurnas - jornadaLaboralDiaria;
        sumaHorasExtrasDiurnas += horasExtra;
      } else {
        //Si no supera la jornada diaria simplemente asignamos la sumatoria
        horas.horasDiurnas = sumaHorasDiurnas;
      }

      //Este caso no debería darse nunca, 
      if (sumaHorasExtrasDiurnas > maximoHorasExtras) {
        //se loguea el error y se asigna el valor máximo posible 
        console.error("Máximo de horas extras diurnas diarias superado!!!");
        horas.horasExtraDiurna = maximoHorasExtras;
      } else {
        horas.horasExtraDiurna = sumaHorasExtrasDiurnas;
      }

      //repetimos para horas nocturnas: 
      if (sumaHorasNocturnas > jornadaLaboralDiaria) {
        horas.horasNocturnas = jornadaLaboralDiaria;
        let horasExtra = sumaHorasNocturnas - jornadaLaboralDiaria;
        sumaHorasExtrasNocturnas += horasExtra;
      } else {
        horas.horasNocturnas = sumaHorasNocturnas;
      }

      if (sumaHorasExtrasNocturnas > maximoHorasExtras) {
        console.error("Máximo de horas extras nocturnas diarias superado!!");
        horas.horasExtraNocturna = maximoHorasExtras;
      } else {
        horas.horasExtraNocturna = sumaHorasExtrasNocturnas;
      }
      horas.totalHoras = horas.horasDiurnas + horas.horasNocturnas + horas.horasExtraDiurna + horas.horasExtraNocturna;
    } else {
      let totalHoras = horasDiurnas + horasNocturnas + horasExtraDiurna + horasExtraNocturna;
      let dia = this.list.dias.find(d => d.id === nombre);
      let label = nombre;
      if (dia) {
        label = dia.label + '';
      }
      horas = new HorasSemana(nombre, label, reformaName, reformaLabel, style, [horario], horasDiurnas, horasNocturnas, horasExtraDiurna, horasExtraNocturna, totalHoras);
      this.horasList.push(horas);
    }

  }

  /**
   * Calcula las horas que trabajó una persona dentro de las Jornada Diurna
   * @param horario Horas en las que trabajó la persona EJ: ['02:00 PM','10:00 PM']
   * @param jornada laboral, EJ Jornada diurna ['06:00 AM','06:00 PM']
   * @returns Horas del horario dento de la jornada, para los ejemplos 4 horas ['02:00 PM','06:00 PM']
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


  /**
   * Redondear todas las horas a dos decimales 
   * @param horasList 
   */
  public redonderar(horasList: HorasSemana[]) {
    horasList.forEach(h => {
      h.horasDiurnas = Math.round(h.horasDiurnas * 100) / 100;
      h.horasExtraDiurna = Math.round(h.horasExtraDiurna * 100) / 100;
      h.horasNocturnas = Math.round(h.horasNocturnas * 100) / 100;
      h.horasExtraNocturna = Math.round(h.horasExtraNocturna * 100) / 100;
    });
  }

}
