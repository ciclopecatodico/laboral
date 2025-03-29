import { Injectable } from '@angular/core';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { ConfigurationService } from '../../configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';
import { Peticion } from '../../../model/peticion/peticion.model';
import { MesModel } from '../../../model/modelos-simulacion/mes-model/mes-model';
import { ValorHoras } from '../../../model/liquidacion/valor-horas/valor-horas';


@Injectable({
  providedIn: 'root'
})
export class LiquidadorMesService {

  public configurationService: ConfigurationService;
  public parametros: Parametros[];

  /**
   * Total horas semana por regimen
   */
  public input = new Array<HorasSemana>();

  /**
   * Horas registradas para cada semana
   */
  public semana1950 = new Array<HorasSemana>();
  public semana789 = new Array<HorasSemana>();
  public semana2025 = new Array<HorasSemana>();

  /**
   * Guarda la liquidación de los meses de un año y su total. 
   */
  public agno1950 = new Array<[]>;

  constructor(configurationService: ConfigurationService) {
    this.configurationService = configurationService;
    this.parametros = configurationService.parametros;
  }


  /**
 * Liquida las horas totales de un mes 
 * @param horasSemana 
 */
  public contarHorasMes(horasSemana: HorasSemana[], mes: MesModel, peticion: Peticion, parametroId: number): ValorHoras {

    let parametros = this.parametros[parametroId];
    //liquida los días empezando por el primer día del mes
    //Todos los meses se liquidan a 30 días
    let diaIndex = CONST.diasSemanaName.findIndex(d => d === mes.diaInicial)
    let mesLiquidar = structuredClone(this.configurationService.valorHoras);
    let esFestivo = false;
    for (let i = 0; i < CONST.diasMes; i++) {
      let j = (i + diaIndex) % 7;
      //validar si no tiene horas ese día se debe contabilizar como jornada diurna normal 
      if (horasSemana[j].totalHoras === 0) {
        //los días de descanso se pagan como una Jornada Laboral Diurna normal.
        mesLiquidar.horasDiurnas += parametros.jornadaLaboralDiaria;
        continue;
      }
      //Si trabaja los festivos entonces identifico si el día es festivo
      if (peticion.festivos && (mes.festivos.find(f => (f - 1) == i) != undefined)) {
        esFestivo = true;
        //console.log("Es festivo!");
      }
      //caso especial liquidar un domingo o un día festivo
      if (horasSemana[j].name === CONST.diaDomingo[0] || esFestivo) {
        //suma las horas diurnas al domingo. 
        console.log(i + " - Dia: " + horasSemana[j].name + " es festivo:" + esFestivo);
        mesLiquidar.horasDiurnasDominicalesOFestivos += horasSemana[j].horasDiurnas;
        mesLiquidar.horasNocturnasDominicalesFestivos += horasSemana[j].horasNocturnas;
        mesLiquidar.horasExtrasDiurnasDominicalesFestivas += horasSemana[j].horasExtraDiurna;
        mesLiquidar.horasExtrasNocturnasDominicalesFestivas += horasSemana[j].horasExtraNocturna;
      } else {
        //Si no tabaja los festivos y no es ni dominical ni festivo lo liquido como un día normal: 
        mesLiquidar.horasDiurnas += horasSemana[j].horasDiurnas;
        mesLiquidar.horasExtraDiurna += horasSemana[j].horasExtraDiurna;
        mesLiquidar.horasNocturnas += horasSemana[j].horasNocturnas;
        mesLiquidar.horasExtraNocturna += horasSemana[j].horasExtraNocturna;
      }
      //hacemos festivo falso para que solo vuelva a entrar a los festivos cuando encuentre otro festivo. 
      esFestivo = false;
    }

    //totalizar las horas del mes: 
    mesLiquidar.totalHoras += mesLiquidar.horasDiurnas;
    mesLiquidar.totalHoras += mesLiquidar.horasExtraDiurna;
    mesLiquidar.totalHoras += mesLiquidar.horasNocturnas;
    mesLiquidar.totalHoras += mesLiquidar.horasExtraNocturna;
    mesLiquidar.totalHoras += mesLiquidar.horasDiurnasDominicalesOFestivos;
    mesLiquidar.totalHoras += mesLiquidar.horasNocturnasDominicalesFestivos;
    mesLiquidar.totalHoras += mesLiquidar.horasExtrasDiurnasDominicalesFestivas;
    mesLiquidar.totalHoras += mesLiquidar.horasExtrasNocturnasDominicalesFestivas;

    //Obtengo el valor de la hora dependiendo de los parámetros 
    mesLiquidar.valorHora = this.calcularValorHora(peticion, parametros);

    //con el valor de la hora liquido el mes según los factores definidos en cada parámetro. 
    mesLiquidar.valorHorasDiurnas = mesLiquidar.horasDiurnas * (mesLiquidar.valorHora * parametros.horasDiurnas.factor);
    mesLiquidar.valorHorasExtraDiurna = mesLiquidar.horasExtraDiurna * (mesLiquidar.valorHora * parametros.horasExtrasDiurnas.factor);
    mesLiquidar.valorHorasNocturnas = mesLiquidar.horasNocturnas * (mesLiquidar.valorHora * parametros.horasNocturnas.factor);
    mesLiquidar.valorHorasExtraNocturna = mesLiquidar.horasExtraNocturna * (mesLiquidar.valorHora * parametros.horasExtrasNocturnas.factor);
    mesLiquidar.valorHorasDiurnasDominicalesOFestivos = mesLiquidar.horasDiurnasDominicalesOFestivos * (mesLiquidar.valorHora * parametros.horasDiurnasDominicalesOFestivos.factor);
    mesLiquidar.valorHorasNocturnasDominicalesFestivos = mesLiquidar.horasNocturnasDominicalesFestivos * (mesLiquidar.valorHora * parametros.horasNocturnasDominicalesFestivos.factor);
    mesLiquidar.valorHorasExtrasDiurnasDominicalesFestivas = mesLiquidar.horasExtrasDiurnasDominicalesFestivas * (mesLiquidar.valorHora * parametros.horasExtrasDiurnasDominicalesFestivas.factor);
    mesLiquidar.valorHorasExtrasNocturnasDominicalesFestivas = mesLiquidar.horasExtrasNocturnasDominicalesFestivas * (mesLiquidar.valorHora * parametros.horasExtrasNocturnasDominicalesFestivas.factor);


    //totalizar valor las horas del mes: 
    mesLiquidar.totalValorHoras += mesLiquidar.valorHorasDiurnas;
    mesLiquidar.totalValorHoras += mesLiquidar.valorHorasExtraDiurna;
    mesLiquidar.totalValorHoras += mesLiquidar.valorHorasNocturnas;
    mesLiquidar.totalValorHoras += mesLiquidar.valorHorasExtraNocturna;
    mesLiquidar.totalValorHoras += mesLiquidar.valorHorasDiurnasDominicalesOFestivos;
    mesLiquidar.totalValorHoras += mesLiquidar.valorHorasNocturnasDominicalesFestivos;
    mesLiquidar.totalValorHoras += mesLiquidar.valorHorasExtrasDiurnasDominicalesFestivas;
    mesLiquidar.totalValorHoras += mesLiquidar.valorHorasExtrasNocturnasDominicalesFestivas;

    mesLiquidar.id = 1;
    mesLiquidar.label = mes.label;
    mesLiquidar.name = mes.nombre;
    mesLiquidar.festivos = mes.festivos.length;
    mesLiquidar.style = parametros.style;
    mesLiquidar.reformaLabel = parametros.name;
    mesLiquidar.reformaName = parametros.reforma;

    return mesLiquidar;

  }


  /**
   * De esta función depende que el cálculo del salario mensual sea acorde al SMLV vigente según la reforma que se esté aplicando a las jornadas 
   * asi el valor de la hora en jornada diurna ordinaria depende de la cantidad de horas que se conciben en la reforma para un mes laboral. 
   * @param peticion 
   * @param parametro 
   * @returns 
   */
  private calcularValorHora(peticion: Peticion, parametro: Parametros): number {
    console.log("Calcular parametro smlv:", parametro.smlv );
    //liquida el valor de las horas del mes 
    //la hora debe tener en cuenta el caso que la persona sea del sena 
    //calcular automaticamente el valor de la hora segun su etapa
    //se asigna por defecto el valor de una hora de salario minimo
    let valorHora = 0;
    if (peticion.salario > parametro.smlv) {
      //El valor de la hora depende de la jornada mensual
      valorHora = peticion.salario / parametro.jornadaLaboralMensual;
    } else {
      console.log("Cambiar valor salario:", peticion.salario);
      peticion.salario = parametro.smlv;
      console.log("Cambiar valor salario despues:", peticion.salario);
      //Por eso se calcula en funcion de la jornada laboral mensual en horas 
      valorHora = parametro.smlv / parametro.jornadaLaboralMensual;
    }
    return valorHora;
  }

}
