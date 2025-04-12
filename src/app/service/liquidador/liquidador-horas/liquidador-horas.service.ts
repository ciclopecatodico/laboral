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
    peticion.salario = (parametros.smlv / parametros.jornadaLaboralMensual);
    this.inicializarHorasList(parametros);
    //calcula las horas por tipo día a día 
    if (peticion.turnos) {
      //calculas las horas diurnas por tipo de hora día a día 
      for (let turno of peticion.turnos) {
        if (turno.dias != null && turno.dias.length > 0) {
          //primero calcula las horas con jornada máxima de 10 horas
          this.calcularTiposDeHoras(turno, parametros);
        }
      }
      //pero si se supera la jornada laboral semanal entonces calculo las horas extras a partir de la jornada laboral diaria 
      let totalSemana = 0;
      this.horasList.forEach(h => totalSemana += h.totalHoras);
      let horasExtra = totalSemana - parametros.jornadaLaboralSemanal;
      if (horasExtra > 0) {
        this.calcularHorasExtra(horasExtra, parametros, peticion);
      }
    }
    //calcula 
    this.redonderar(this.horasList);
    return this.horasList;
  }


  /**

   * 
   * 
   * 
   * @param horasExtra cantidad de horas extra que debo liquidar
   * @param parametros Los parámetros de la reforma que estoy procesando
   * @param peticion el horario provisto
   */
  private calcularHorasExtra(horasExtra: number, parametros: Parametros, peticion: Peticion) {
    this.inicializarHorasList(parametros);
    if (peticion.turnos) {
      for (let turno of peticion.turnos) {
        //por defecto voy contra la jornada laboral maxima 
        let jornadaLaboralDiaria = parametros.jornadaLaboralDiariaMaxima;
        if (horasExtra > 0) {
          jornadaLaboralDiaria = parametros.jornadaLaboralDiaria;
        }
        if (turno.dias != null && turno.dias.length > 0) {
          //Si tengo horas extra voy contra la jornada laboral diaria 
          turno.dias.forEach(t => {
            //para cada día calculo las horas que exceden la jornadaLaboralDiaria
            horasExtra = this.calcularTiposDeHorasConHorasExtra(t, turno, parametros, jornadaLaboralDiaria, horasExtra);
            jornadaLaboralDiaria = parametros.jornadaLaboralDiariaMaxima;
            if (horasExtra > 0) {
              jornadaLaboralDiaria = parametros.jornadaLaboralDiaria;
            }
          });
        }
      }
    }
  }

  private inicializarHorasList(parametro: Parametros) {
    this.horasList = structuredClone(this.configurationService.semana);
    this.horasList.forEach(h => {
      h.reformaName = parametro.reformaName;
      h.reformaLabel = parametro.reformaLabel;
      h.style = parametro.style;
    });
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
    if (horasTotales > parametro.jornadaLaboralDiariaMaxima) {
      //Habría horas extras diurnas así: 
      horasExtrasDiurnas = horasTotales - parametro.jornadaLaboralDiariaMaxima;
      horasDiurnas = horasDiurnas1 - horasExtrasDiurnas;
    } else {
      horasDiurnas = horasDiurnas1;
    }
    //calculo las horas nocturnas en la noche
    let horasNocturnas2 = this.calcularHorasDentroDelTurno(horario, jornadaNocturna2);
    horasTotales = horasNocturnas1 + horasDiurnas1 + horasNocturnas2;
    if (horasTotales > parametro.jornadaLaboralDiariaMaxima) {
      horasExtraNocturnas = horasTotales - parametro.jornadaLaboralDiariaMaxima;
      horasExtraNocturnas = horasExtraNocturnas - horasExtrasDiurnas;
      horasNocturnas = (horasNocturnas1 + horasNocturnas2) - horasExtraNocturnas;
    } else {
      horasNocturnas = horasNocturnas1 + horasNocturnas2;
    }
    turno.dias?.forEach(
      dia => {
        this.guardarDia(
          dia,
          parametro.reformaName,
          parametro.reformaLabel,
          parametro.style,
          horario,
          horasDiurnas,
          horasNocturnas,
          horasExtrasDiurnas,
          horasExtraNocturnas,
          parametro.jornadaLaboralDiariaMaxima,
          parametro.maximoHorasExtras
        );
      }
    );
  }


  /**
   * Liquida las horas de la semana cuando hay horas extra es decir la sumatoria de horas trabajadas a la semana excede la jornada semanal estipulada 
   * Como este método solo se ejecuta cuando sé que tengo horas extras entonces empiezo por el primer día a la semana (Lunes) y lo comparo contra la 
   * jornada diaria que estipula la reforma, si hay un excedente ej Lunes 9H JD 8 => 1 diferencia 
   * Descuento esa diferencia de las horas extra que debo agregar
   * Registro este día [Lunes] con las horas extra y retorno las horas restantes (horasExtra - horasExtraProcesadas)
   * @param dia de la semana que estoy procesando 
   * @param turno descripción de horas y días 
   * @param parametro configuracion obtenida de la reforma
   * @param jornadaLaboralDiaria Jornada contra la que calculo las horas extra puede ser (Jornada Diaria o Jornada Maxima Diaria)
   * @param horasExtra Las horas extra pendientes de procesar
   * @returns Horas extra pendientes de procesar luego de liquidar el día. 
   */
  private calcularTiposDeHorasConHorasExtra(dia: string, turno: Turno, parametro: Parametros, jornadaLaboralDiaria: number, horasExtra: number): number {
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
    //Modifica para solo contar las horas extras si se sobrepasó la jornada maxima semanal 
    if (horasTotales > jornadaLaboralDiaria) {
      //Habría horas extras diurnas así: 
      horasExtrasDiurnas = horasTotales - jornadaLaboralDiaria;
      horasDiurnas = horasDiurnas1 - horasExtrasDiurnas;
      //descuento las horas extra que ya agregue 
      horasExtra -= horasExtrasDiurnas;
    } else {
      horasDiurnas = horasDiurnas1;
    }
    //calculo las horas nocturnas en la noche
    let horasNocturnas2 = this.calcularHorasDentroDelTurno(horario, jornadaNocturna2);
    horasTotales = horasNocturnas1 + horasDiurnas1 + horasNocturnas2;
    if (horasTotales > jornadaLaboralDiaria) {
      horasExtraNocturnas = horasTotales - jornadaLaboralDiaria;
      horasExtraNocturnas = horasExtraNocturnas - horasExtrasDiurnas;
      horasNocturnas = (horasNocturnas1 + horasNocturnas2) - horasExtraNocturnas;
      horasExtra -= horasExtraNocturnas;
    } else {
      horasNocturnas = horasNocturnas1 + horasNocturnas2;
    }
    // console.log("horasDiurnas:", horasDiurnas);
    // console.log("horasNocturnas:", horasNocturnas);
    // console.log("horasExtrasDiurnas:", horasExtrasDiurnas);
    // console.log("horasExtraNocturnas:", horasExtraNocturnas);
    //guardo las horas extra para el día que recibo como argumento 
    this.guardarDia(
      dia,
      parametro.reformaName,
      parametro.reformaLabel,
      parametro.style,
      horario,
      horasDiurnas,
      horasNocturnas,
      horasExtrasDiurnas,
      horasExtraNocturnas,
      jornadaLaboralDiaria,
      parametro.maximoHorasExtras
    );
    return horasExtra;
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
        //si hubo horas extra las guardamos 
        horas.horasExtraDiurna = horasExtra;
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
      horas = new HorasSemana(
        nombre,
        label,
        reformaName,
        reformaLabel,
        style,
        [horario],
        horasDiurnas,
        horasNocturnas,
        horasExtraDiurna,
        horasExtraNocturna,
        totalHoras
      );
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
