import { Injectable } from '@angular/core';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { ConfigurationService } from '../../configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';
import { Peticion } from '../../../model/peticion/peticion.model';
import { ValorHoras } from '../../../model/liquidacion/valor-horas/valor-horas';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { LiquidadorMesService } from '../liquidador-mes/liquidador-mes.service';
import { Laboral } from '../../../model/simulacion/laboral/laboral';


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

  public inicioSimu = 0;
  public finalSimu = 0;

  /**
* Horas registradas para cada semana
*/
  public total1950: ValorHoras;
  public total789: ValorHoras;
  public total2025: ValorHoras;

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
    this.total1950 = structuredClone(this.configurationService.valorHoras);
    this.total789 = structuredClone(this.configurationService.valorHoras);
    this.total2025 = structuredClone(this.configurationService.valorHoras);
  }

  /**
   * Calcula el valor de un mes para todas las reformas 
   * @param agno 
   * @param peticion 
   */
  public simularAngos(agno: ValorHoras[], peticion: Peticion): Laboral {
    //Inicializa los arreglos que contienen un año liquidado por cada tipo de reforma
    this.filtraTotalPorReforma(agno);
    
    //debo calcular empezando desde su experiencia laboral y hasta su edad de pension para cada reforma. 
    this.calcularInicioFinSimulacion(peticion);

    //genera la simulacion para cada reforma 
    this.laboral1950 = this.generarAngos(this.total1950);
    this.laboral789 = this.generarAngos(this.total789);
    this.laboral2025 = this.generarAngos(this.total2025);

    //calcular totales para cada simulación. 
    this.calcularTotales(this.laboral1950);
    this.calcularTotales(this.laboral789);
    this.calcularTotales(this.laboral2025);
    let valorHoras = new Array<ValorHoras>();
    
    //retornamos un arreglo que contiene todos los agños calculados. 
    valorHoras = [...this.laboral1950, ...this.laboral789, ...this.laboral2025];
    
    return new Laboral(this.inicioSimu, this.finalSimu, peticion.salario, valorHoras);
  }

  /**
   * Filtramos el arreglo de horas del año y nos quedamos solo con el total para cada tipo de reforma. 
   * @param agno Arreglo con todas las horas mensuales de los diferentes tipos de reformas
   */
  private filtraTotalPorReforma(agno: ValorHoras[]) {
    this.total1950 = agno.filter(h => (h.reformaName === CONST.reforma1950.reforma && h.name === CONST.totalName))[0];
    this.total789 = agno.filter(h => (h.reformaName === CONST.reforma789.reforma && h.name === CONST.totalName))[0];
    this.total2025 = agno.filter(h => (h.reformaName === CONST.reforma2025.reforma && h.name === CONST.totalName))[0];
  }


  private calcularInicioFinSimulacion(peticion: Peticion) {
    //
    let edadPension = CONST.hombre.edadPension;
    if (peticion.sexo != undefined && peticion.sexo === CONST.mujer.sexo) {
      edadPension = CONST.mujer.edadPension;
    }
    //la edad de pensión menos la edad nos da el año final de la simulación
    if (peticion.edad) {
      this.finalSimu = CONST.agnoActual + (edadPension - peticion.edad);
    }
    //los años de experiencia dan el año de inicio de nuestra simulación
    if (peticion.experiencia) {
      this.inicioSimu = CONST.agnoActual - peticion.experiencia;
    }
  }


  /**
   * Recibe el total de un año y lo replica a los años de experiencia y hasta la edad de pension
   * @param inicio 
   * @param fin 
   * @param valorHoras 
   */
  private generarAngos(valorHoras: ValorHoras): ValorHoras[] {
    let laboral = new Array<ValorHoras>;
    for (let i = this.inicioSimu; i < this.finalSimu; i++) {
      //copio el año y le cambio el nombre por el número del año
      let agno = this.calcularAgno(valorHoras, i);
      laboral.push(agno);
    }
    return laboral;
  }

  /**
   * Por ahora solo copia el agno 
   * @param valorHoras 
   * @param agno 
   * @returns 
   */
  private calcularAgno(valorHoras: ValorHoras, agno: number): ValorHoras {
    //TODO extraer funcionalidad y realizar cálculos indexados al año. 
    let item = structuredClone(valorHoras);
    item.id = agno;
    item.label = '' + agno;
    item.name = '' + agno;
    return item;
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

}
