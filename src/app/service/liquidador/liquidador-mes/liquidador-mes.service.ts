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
    //liquida los días empezando por el primer día del mes
    //Todos los meses se liquidan a 30 días
    let diaIndex = CONST.diasSemanaName.findIndex(d => d === mes.diaInicial)
    let mesLiquidar = structuredClone(this.configurationService.valorHoras);
    let isFestivo = false;
    for (let i = 0; i < CONST.diasMes; i++) {
      let j = (i + diaIndex) % 7;
      //validar si no tiene horas ese día se debe saltar y continuar con el siguiente día 
      if (horasSemana[j].totalHoras === 0) {
        continue;
      }
      //identifico si el día es festivo 
      if (mes.festivos.find(f => f === i) != undefined) {
        isFestivo = true;
      }
      //caso especial liquidar un domingo o un día festivo
      if (horasSemana[j].name === CONST.diaDomingo[0] || isFestivo) {
        //suma las horas diurnas al domingo. 
        mesLiquidar.horasDiurnasDominicalesOFestivos += horasSemana[j].horasDiurnas;
        mesLiquidar.horasNocturnasDominicalesFestivos += horasSemana[j].horasNocturnas;
        mesLiquidar.horasExtrasDiurnasDominicalesFestivas += horasSemana[j].horasExtraDiurna;
        mesLiquidar.horasExtrasNocturnasDominicalesFestivas += horasSemana[j].horasExtraNocturna;
      } else {
        //Si no es ni dominical ni festivo lo liquido como un día normal: 
        mesLiquidar.horasDiurnas += horasSemana[j].horasDiurnas;
        mesLiquidar.horasExtraDiurna += horasSemana[j].horasExtraDiurna;
        mesLiquidar.horasNocturnas += horasSemana[j].horasNocturnas;
        mesLiquidar.horasExtraNocturna += horasSemana[j].horasExtraNocturna;
      }
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

    //liquida el valor de las horas del mes 
    //la hora debe tener en cuenta el caso que la persona sea del sena 
    //calcular automaticamente el valor de la hora segun su etapa
    let parametros = this.parametros[parametroId];
    //se asigna por defecto el valor de una hora de salario minimo
    let valorHora = peticion.valorHora ? peticion.valorHora : parametros.smlvHora;

    mesLiquidar.valorHora = valorHora; 

    mesLiquidar.valorHorasDiurnas = mesLiquidar.horasDiurnas * (valorHora * parametros.horasDiurnas);
    mesLiquidar.valorHorasExtraDiurna = mesLiquidar.horasExtraDiurna * (valorHora * parametros.horasExtrasDiurnas);
    mesLiquidar.valorHorasNocturnas = mesLiquidar.horasNocturnas * (valorHora * parametros.horasNocturnas);
    mesLiquidar.valorHorasExtraNocturna = mesLiquidar.horasExtraNocturna * (valorHora * parametros.horasExtrasNocturnas);
    mesLiquidar.valorHorasDiurnasDominicalesOFestivos = mesLiquidar.horasDiurnasDominicalesOFestivos * (valorHora * parametros.horasDiurnasDominicalesOFestivos);
    mesLiquidar.valorHorasNocturnasDominicalesFestivos = mesLiquidar.horasNocturnasDominicalesFestivos * (valorHora * parametros.horasNocturnasDominicalesFestivos);
    mesLiquidar.valorHorasExtrasDiurnasDominicalesFestivas = mesLiquidar.horasExtrasDiurnasDominicalesFestivas * (valorHora * parametros.horasExtrasDiurnasDominicalesFestivas);
    mesLiquidar.valorHorasExtrasNocturnasDominicalesFestivas = mesLiquidar.horasExtrasNocturnasDominicalesFestivas * (valorHora * parametros.horasExtrasNocturnasDominicalesFestivas);


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
    mesLiquidar.reformaLabel = parametros.reforma;
    mesLiquidar.reformaName = parametros.name;

    return mesLiquidar;

  }

}
