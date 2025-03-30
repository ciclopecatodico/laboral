import { Injectable } from '@angular/core';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { ConfigurationService } from '../../configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';
import { Peticion } from '../../../model/peticion/peticion.model';
import { ValorHoras } from '../../../model/liquidacion/valor-horas/valor-horas';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { LiquidadorMesService } from '../liquidador-mes/liquidador-mes.service';


/**
 * Liquida un conjunto de años
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class LiquidadorAgnosService {

  public configurationService: ConfigurationService;
  public liquidadorMesService: LiquidadorMesService;

  public parametros: Parametros[];

  /**
 * Horas registradas para cada semana
 */
  public semana1950 = new Array<HorasSemana>();
  public semana789 = new Array<HorasSemana>();
  public semana2025 = new Array<HorasSemana>();

  /**
   * Guarda la liquidación de la historia laboral. 
   */
  public laboral1950 = new Array<ValorHoras>;
  public laboral789 = new Array<ValorHoras>;
  public laboral2025 = new Array<ValorHoras>;

  constructor(configurationService: ConfigurationService, liquidadorMesService: LiquidadorMesService) {
    this.configurationService = configurationService;
    this.liquidadorMesService = liquidadorMesService;
    this.parametros = configurationService.parametros;
  }

  /**
   * Calcula el valor de un mes para todas las reformas 
   * @param horasSemana 
   * @param peticion 
   */
  public simularAngo(horasSemana: HorasSemana[], peticion: Peticion): ValorHoras[] {
    //Inicializa los arreglos que contienen las horas liquidadas por cada tipo de reforma
    this.llenarHorasTotalesPorSemanaYReforma(horasSemana);
    //Limpiar variables que almacenan la simulacion
    this.laboral1950 = new Array<ValorHoras>;
    this.laboral789 = new Array<ValorHoras>;
    this.laboral2025 = new Array<ValorHoras>;
    //obtener el año que trae los parametros de
    let agno = this.configurationService.agnoModel;

    let valorHora1950 = this.calcularValorHora(peticion, CONST.reforma1950.index);
    let valorHora789 = this.calcularValorHora(peticion, CONST.reforma789.index);
    let valorHora2025 = this.calcularValorHora(peticion, CONST.reforma2025.index);

    //por defecto la duracion de la simulacion es 12 meses de un año
    let duracion = agno.meses.length;
    //pero para el caso del sena la duracion se ingresa 
    if (peticion.sena) {
      if (peticion.duracion && peticion.duracion > 0) {
        duracion = peticion.duracion;
      }
    }

    for (let i = 0; i < duracion; i++) {
      let mesIndex = i%12;
      let mes1950 = this.liquidadorMesService.contarHorasMes(this.semana1950, agno.meses[mesIndex], peticion, valorHora1950, CONST.reforma1950.index);
      this.laboral1950.push(mes1950);
      let mes789 = this.liquidadorMesService.contarHorasMes(this.semana789, agno.meses[mesIndex], peticion, valorHora789, CONST.reforma789.index);
      this.laboral789.push(mes789);
      let mes2025 = this.liquidadorMesService.contarHorasMes(this.semana2025, agno.meses[mesIndex], peticion, valorHora2025, CONST.reforma2025.index);
      this.laboral2025.push(mes2025);
    }

    this.calcularTotales(this.laboral1950);
    this.calcularTotales(this.laboral789);
    this.calcularTotales(this.laboral2025);
    let agnos = new Array<ValorHoras>();
    //retornamos un arreglo que contiene todos los agños calculados. 
    agnos = [...this.laboral1950, ...this.laboral789, ...this.laboral2025];
    return agnos;
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


  private calcularTotales(agno: ValorHoras[]) {
    //inicializo el total de horas a 0
    let total = structuredClone(this.configurationService.valorHoras);
    total.id = 13;
    total.label = CONST.totalLabel;
    total.name = CONST.totalName;
    total.reformaLabel = agno[0].reformaLabel;
    total.reformaName = agno[0].reformaName;
    total.style = agno[0].style;
    total.valorHora = agno[0].valorHora;
    agno.forEach(mes => {
      //totalizo las horas del año
      total.horasDiurnas += mes.horasDiurnas;
      total.horasNocturnas += mes.horasNocturnas;
      total.horasExtraDiurna += mes.horasExtraDiurna;
      total.horasExtraNocturna += mes.horasExtraNocturna;
      total.horasDiurnasDominicalesOFestivos += mes.horasDiurnasDominicalesOFestivos;
      total.horasNocturnasDominicalesFestivos += mes.horasNocturnasDominicalesFestivos;
      total.horasExtrasDiurnasDominicalesFestivas += mes.horasExtrasDiurnasDominicalesFestivas;
      total.horasExtrasNocturnasDominicalesFestivas += mes.horasExtrasNocturnasDominicalesFestivas;
      total.totalHoras += mes.totalHoras;
      //totalizo el valor de las horas del año
      total.valorHorasDiurnas += mes.valorHorasDiurnas;
      total.valorHorasNocturnas += mes.valorHorasNocturnas;
      total.valorHorasExtraDiurna += mes.valorHorasExtraDiurna;
      total.valorHorasExtraNocturna += mes.valorHorasExtraNocturna;
      total.valorHorasDiurnasDominicalesOFestivos += mes.valorHorasDiurnasDominicalesOFestivos;
      total.valorHorasNocturnasDominicalesFestivos += mes.valorHorasNocturnasDominicalesFestivos;
      total.valorHorasExtrasDiurnasDominicalesFestivas += mes.valorHorasExtrasDiurnasDominicalesFestivas;
      total.valorHorasExtrasNocturnasDominicalesFestivas += mes.valorHorasExtrasNocturnasDominicalesFestivas;
      total.totalValorHoras += mes.totalValorHoras;
    })
    //agregamos el total al final del año
    agno.push(total);
  }

  /**
   * De esta función depende que el cálculo del salario mensual sea acorde al SMLV vigente según la reforma que se esté aplicando a las jornadas 
   * asi el valor de la hora en jornada diurna ordinaria depende de la cantidad de horas que se conciben en la reforma para un mes laboral. 
   * @param peticion 
   * @param parametro 
   * @returns 
   */
  private calcularValorHora(peticion: Peticion, parametroId: number): number {
    //liquida el valor de las horas del mes 
    //la hora debe tener en cuenta el caso que la persona sea del sena 
    //calcular automaticamente el valor de la hora segun su etapa
    //se asigna por defecto el valor de una hora de salario minimo
    let parametro = this.parametros[parametroId];
    let valorHora = 0;
    if (peticion.salario > parametro.smlv) {
      //El valor de la hora depende de la jornada mensual
      valorHora = peticion.salario / parametro.jornadaLaboralMensual;
    } else {
      peticion.salario = parametro.smlv;
      //Por eso se calcula en funcion de la jornada laboral mensual en horas 
      valorHora = parametro.smlv / parametro.jornadaLaboralMensual;
    }
    //Ajusta el valor de la hora dependiendo si es estudiante del sena y la etapa en la que se encuentra: 
    if (peticion.sena) {
      if (peticion.etapa === CONST.senaLectiva.id) {
        valorHora = (valorHora * (parametro.senaLectiva / 100));
      } else {
        valorHora = (valorHora * (parametro.senaProductiva / 100));
      }
    }
    return valorHora;
  }

}
