import { Injectable } from '@angular/core';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { ConfigurationService } from '../../configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';
import { Peticion } from '../../../model/peticion/peticion.model';
import { MesModel } from '../../../model/modelos-simulacion/mes-model/mes-model';
import { ValorHoras } from '../../../model/liquidacion/valor-horas/valor-horas';
import { Mes } from '../../../model/simulacion/mes/mes';
import { BarChartCompuesto } from '../../../model/charts/bars-chart/bars-chart-compuesto';
import { GraficoService } from '../../grafico/grafico.service';
import { BarrasSimpleDatos } from '../../../model/charts/barras/baras-simple-datos';


@Injectable({
  providedIn: 'root'
})
export class LiquidadorMesService {

  private configurationService: ConfigurationService;
  private graficoService: GraficoService;
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
  public semana2101 = new Array<HorasSemana>();
  public semana2025 = new Array<HorasSemana>();


  public valorHoras1950 = Object.create(ValorHoras);
  public valorHoras789 = Object.create(ValorHoras);
  public valorHoras2101 = Object.create(ValorHoras);
  public valorHoras2025 = Object.create(ValorHoras);

  public series: ApexAxisChartSeries;

  constructor(configurationService: ConfigurationService, graficoService: GraficoService) {
    this.configurationService = configurationService;
    this.graficoService = graficoService;
    this.parametros = configurationService.parametros;
    this.series = [];
  }

  public simularMes(horasSemana: HorasSemana[], peticion: Peticion): Mes {

    //Inicializa los arreglos que contienen las horas liquidadas por cada tipo de reforma
    this.llenarHorasTotalesPorSemanaYReforma(horasSemana);
    //Limpiar variables que almacenan la simulacion
    this.valorHoras1950 = Object.create(ValorHoras);
    this.valorHoras789 = Object.create(ValorHoras);
    this.valorHoras2101 = Object.create(ValorHoras);
    this.valorHoras2025 = Object.create(ValorHoras);
    //obtener el año que trae los parametros de
    let agno = this.configurationService.agnoModel;
    let mesIndex = 2 //Marzo 0 1 2
    //
    let valorHora1950 = this.calcularValorHora(peticion, CONST.reforma1950.index);
    let valorHora789 = this.calcularValorHora(peticion, CONST.reforma789.index);
    let valorHora2101 = this.calcularValorHora(peticion, CONST.reforma2101.index);
    let valorHora2025 = this.calcularValorHora(peticion, CONST.reforma2025.index);

    this.valorHoras1950 = this.contarHorasMes(this.semana1950, agno.meses[mesIndex], peticion, valorHora1950, CONST.reforma1950.index);
    this.valorHoras789 = this.contarHorasMes(this.semana789, agno.meses[mesIndex], peticion, valorHora789, CONST.reforma789.index);
    this.valorHoras2101 = this.contarHorasMes(this.semana2101, agno.meses[mesIndex], peticion, valorHora2101, CONST.reforma2101.index);
    this.valorHoras2025 = this.contarHorasMes(this.semana2025, agno.meses[mesIndex], peticion, valorHora2025, CONST.reforma2025.index);

    let valorHoras = [this.valorHoras1950, this.valorHoras789, this.valorHoras2101, this.valorHoras2025];

    let barrasHorasPonderadas = undefined;
    let barrasSimpleDatos = this.generarBarrasSimpleDatos(valorHoras);

    return new Mes(peticion.salario, valorHoras, barrasSimpleDatos, barrasHorasPonderadas);
  }

  /**
   * Liquida las horas totales de un mes 
   * @param horasSemana
   */
  public contarHorasMes(horasSemana: HorasSemana[], mes: MesModel, peticion: Peticion, valorHoras: number, parametroId: number): ValorHoras {

    let parametros = this.parametros[parametroId];
    //liquida los días empezando por el primer día del mes
    //Todos los meses se liquidan a 30 días
    let diaIndex = CONST.diasSemanaName.findIndex(d => d === mes.diaInicial)
    let mesLiquidar = structuredClone(this.configurationService.valorHoras);

    //Obtengo el valor de la hora dependiendo de los parámetros 
    mesLiquidar.valorHora = valorHoras;

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
    mesLiquidar.reformaLabel = parametros.reformaLabel;
    mesLiquidar.reformaName = parametros.reformaName;
    mesLiquidar.reformaIndex = parametros.reformaIndex;

    return mesLiquidar;

  }

  /**
* Filtra y llena las horas semanales por cada tipo de reforma que se usarán para calcular las horas mensuales
* En este punto todos los arreglos deben empezar por el días lunes y terminar en total
* @param horasSemana Arreglo con todas las horas semanales de los diferentes tipos de reformas
*/
  public llenarHorasTotalesPorSemanaYReforma(horasSemana: HorasSemana[]) {
    this.semana1950 = horasSemana.filter(h => (h.reformaName === CONST.reforma1950.reforma));
    this.semana789 = horasSemana.filter(h => (h.reformaName === CONST.reforma789.reforma));
    this.semana2101 = horasSemana.filter(h => (h.reformaName === CONST.reforma2101.reforma));
    this.semana2025 = horasSemana.filter(h => (h.reformaName === CONST.reforma2025.reforma));
  }


  /**
   * De esta función depende que el cálculo del salario mensual sea acorde al SMLV vigente según la reforma que se esté aplicando a las jornadas 
   * asi el valor de la hora en jornada diurna ordinaria depende de la cantidad de horas que se conciben en la reforma para un mes laboral. 
   * @param peticion 
   * @param parametro 
   * @returns 
   */
  public calcularValorHora(peticion: Peticion, parametroId: number): number {
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


  public redonderar(agno: ValorHoras[]) {
    agno.forEach(m => {
      m.horasDiurnas = Math.round(m.horasDiurnas * 100) / 100;
      m.horasNocturnas = Math.round(m.horasNocturnas * 100) / 100;
      m.horasExtraDiurna = Math.round(m.horasExtraDiurna * 100) / 100;
      m.horasExtraNocturna = Math.round(m.horasExtraNocturna * 100) / 100;
      m.horasDiurnasDominicalesOFestivos = Math.round(m.horasDiurnasDominicalesOFestivos * 100) / 100;
      m.horasNocturnasDominicalesFestivos = Math.round(m.horasNocturnasDominicalesFestivos * 100) / 100;
      m.horasExtrasDiurnasDominicalesFestivas = Math.round(m.horasExtrasDiurnasDominicalesFestivas * 100) / 100;
      m.horasExtrasNocturnasDominicalesFestivas = Math.round(m.horasExtrasNocturnasDominicalesFestivas * 100) / 100;
      m.totalHoras = Math.round(m.totalHoras * 100) / 100;
    });
  }



  /**GENERACIÓN DE DATOS PARA LOS GRÁFICOS  */

  private generarBarrasSimpleDatos(valorHoras: ValorHoras[]): BarrasSimpleDatos {
    //generar categorias: 
    let categorias = Array<string>();
    let colors = Array<string>();
    this.parametros.forEach(p => { 
      categorias.push(p.reformaLabel);
      colors.push(p.colorFill);
     });
    //generar datos: 
    let data = Array<number>();
    
    valorHoras.forEach(vh => {
      data.push(vh.totalValorHoras);
      
    });
    return {
      chartLabel:"Salario mensual",
      dataLabel: "Salario",
      colors: colors,
      data: data,
      categories: categorias,
      labelColor: ['var(--GrapLabel)'],
      prefix: '',
      sufix: ' M',
      factor: 1000,
      decimales: 1000,
      separador: '.'
    };
  }

  /**
* Crea un grafico que compara los diferentes tipos de horas por reforma 
* @returns 
*/
  private setBarrasTipoHorasPonderado() {
    //TODO
    let categorias = Array<string>();
    this.parametros.forEach(p => { categorias.push(p.reformaLabel) });
    this.series = this.generarSeries(true);
  }

  /**
     * Genera la serie de datos agrupado por tipo de horas 
     * @returns 
     */
  private generarSeries(ponderado: boolean): ApexAxisChartSeries {
    let diurnas = Array<number>();
    let nocturnas = Array<number>();
    let extraDiurnas = Array<number>();
    let extraNocturnas = Array<number>();
    let diurnasDomOFest = Array<number>();
    let nocturnasDomOFest = Array<number>();
    let extraDiurnasDomOFest = Array<number>();
    let extraNocturnasDomOFest = Array<number>();
    let sumatoria = Array<number>();

    //valores para ponderar las horas, por defecto 1 que no afecta los valores
    let diurna = 1;
    let nocturna = 1;
    let extraDiurna = 1;
    let extraNocturna = 1;
    let diurnaDomOFest = 1;
    let nocturnaDomOFest = 1;
    let extraDiurnaDomOFest = 1;
    let extraNocturnaDomOFest = 1;

    // this.totales.forEach(
    //   t => {
    //     if (ponderado) {
    //       let reforma = this.parametros.find(p => p.reformaName === t.reformaName);
    //       if (reforma) {
    //         diurna = reforma.horasDiurnas.factor * reforma.smlvHora;
    //         nocturna = reforma.horasNocturnas.factor * reforma.smlvHora;
    //         extraDiurna = reforma.horasExtrasDiurnas.factor * reforma.smlvHora;
    //         extraNocturna = reforma.horasExtrasNocturnas.factor * reforma.smlvHora;
    //       }
    //     }

    //     let diurnaPonderada = this.round(t.horasDiurnas * diurna);
    //     let nocturnaPonderada = this.round(t.horasNocturnas * nocturna);
    //     let extraDiurnaPonderada = this.round(t.horasExtraDiurna * extraDiurna);
    //     let extraNocturnaPonderada = this.round(t.horasExtraNocturna * extraNocturna);

    //     diurnas.push(diurnaPonderada);
    //     nocturnas.push(nocturnaPonderada);
    //     extraDiurnas.push(extraDiurnaPonderada);
    //     extraNocturnas.push(extraNocturnaPonderada);
    //     sumatoria.push(diurnaPonderada + nocturnaPonderada + extraDiurnaPonderada + extraNocturnaPonderada)
    //   }
    // );

    let dirunasSerie = {
      name: CONST.horasDiurnas.label,
      data: diurnas
    };

    let nocturnasSerie = {
      name: CONST.horasNocturnas.label,
      data: nocturnas
    };

    let extraDirunasSerie = {
      name: CONST.horasExtrasDiurnas.label,
      data: extraDiurnas
    };

    let extraNocturnasSerie = {
      name: CONST.horasExtrasNocturnas.label,
      data: extraNocturnas
    };

    let sumatoriaSerie = {
      name: CONST.horasPonderadas.label,
      data: sumatoria
    };

    if (ponderado) {
      return [dirunasSerie, nocturnasSerie, extraDirunasSerie, extraNocturnasSerie, sumatoriaSerie];
    }
    return [dirunasSerie, nocturnasSerie, extraDirunasSerie, extraNocturnasSerie];
  }


  private round(data: number) {
    return Math.round(data * 10) / 10;
  }
}
