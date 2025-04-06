import { Injectable } from '@angular/core';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { ConfigurationService } from '../../configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';
import { Peticion } from '../../../model/peticion/peticion.model';
import { MesModel } from '../../../model/modelos-simulacion/mes-model/mes-model';
import { ValorHoras } from '../../../model/liquidacion/valor-horas/valor-horas';
import { Mes } from '../../../model/simulacion/mes/mes';
import { BarrasSimpleDatos } from '../../../model/graficos/barras/baras-simple-datos';
import { AgnoModel } from '../../../model/modelos-simulacion/agno-model/agno-model';


@Injectable({
  providedIn: 'root'
})
export class LiquidadorMesService {

  private configurationService: ConfigurationService;
  private agno : AgnoModel;
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


  public valorHorasDia1950: Array<ValorHoras>;
  public valorHorasDia789: Array<ValorHoras>;
  public valorHorasDia2101: Array<ValorHoras>;
  public valorHorasDia2025: Array<ValorHoras>;

  public valorHoras1950: ValorHoras;
  public valorHoras789: ValorHoras;
  public valorHoras2101: ValorHoras;
  public valorHoras2025: ValorHoras;

  public series: ApexAxisChartSeries;

  constructor(configurationService: ConfigurationService) {
    this.configurationService = configurationService;
    this.parametros = configurationService.parametros;
    this.agno = configurationService.agnoModel; 
    this.series = [];
    this.valorHoras1950 = Object.create(ValorHoras);
    this.valorHoras789 = Object.create(ValorHoras);
    this.valorHoras2101 = Object.create(ValorHoras);
    this.valorHoras2025 = Object.create(ValorHoras);
    this.valorHorasDia1950 = new Array<ValorHoras>();
    this.valorHorasDia789 = new Array<ValorHoras>();
    this.valorHorasDia2101 = new Array<ValorHoras>();
    this.valorHorasDia2025 = new Array<ValorHoras>();
  }

  public simularMes(horasSemana: HorasSemana[], peticion: Peticion): Mes {
    //Inicializa los arreglos que contienen las horas liquidadas por cada tipo de reforma
    this.llenarHorasTotalesPorSemanaYReforma(horasSemana);
    //Limpiar variables que almacenan la simulacion
    this.valorHoras1950 = Object.create(ValorHoras);
    this.valorHoras789 = Object.create(ValorHoras);
    this.valorHoras2101 = Object.create(ValorHoras);
    this.valorHoras2025 = Object.create(ValorHoras);

    //
    let valorHora1950 = this.calcularValorHora(peticion, CONST.reforma1950.index);
    let valorHora789 = this.calcularValorHora(peticion, CONST.reforma789.index);
    let valorHora2101 = this.calcularValorHora(peticion, CONST.reforma2101.index);
    let valorHora2025 = this.calcularValorHora(peticion, CONST.reforma2025.index);

    //inicializar los arreglos
    this.valorHorasDia1950 = new Array<ValorHoras>();
    this.valorHorasDia789 = new Array<ValorHoras>();
    this.valorHorasDia2101 = new Array<ValorHoras>();
    this.valorHorasDia2025 = new Array<ValorHoras>();

    //liquidar todos los días
    this.valorHoras1950 = this.contarHorasMesConDias(this.valorHorasDia1950, this.semana1950, peticion, valorHora1950, CONST.reforma1950.index);
    this.valorHoras789 = this.contarHorasMesConDias(this.valorHorasDia789, this.semana789, peticion, valorHora789, CONST.reforma789.index);
    this.valorHoras2101 = this.contarHorasMesConDias(this.valorHorasDia2101, this.semana2101,  peticion, valorHora2101, CONST.reforma2101.index);
    this.valorHoras2025 = this.contarHorasMesConDias(this.valorHorasDia2025, this.semana2025, peticion, valorHora2025, CONST.reforma2025.index);

    let valorHoras = [this.valorHoras1950, this.valorHoras789, this.valorHoras2101, this.valorHoras2025];

    let barrasHorasPonderadas = undefined;
    let barrasSimpleDatos = this.generarBarrasSimpleDatos(valorHoras);

    valorHoras = [...this.valorHorasDia1950, this.valorHoras1950, ...this.valorHorasDia789, this.valorHoras789, ...this.valorHorasDia2101, this.valorHoras2101, ...this.valorHorasDia2025, this.valorHoras2025];

    return new Mes(peticion.salario, valorHoras, barrasSimpleDatos, barrasHorasPonderadas);
  }

  /**
   * Liquida las horas totales de un mes 
   * @param horasSemana
   */
  public contarHorasMesConDias(horasDia: ValorHoras[], horasSemana: HorasSemana[], peticion: Peticion, valorHora: number, parametroId: number): ValorHoras {
    //si viene un valor para el mes lo uso, sino pongo marzo
    let mes = this.agno.meses.find(m => m.id === peticion.mesId);
    if(mes== undefined){
      mes = this.agno.meses[2];
    }
    let parametros = this.parametros[parametroId];
    //liquida los días empezando por el primer día del mes
    //Todos los meses se liquidan a 30 días
    let diaIndex = CONST.diasSemanaName.findIndex(d => d === mes.diaInicial)
    let mesLiquidar = structuredClone(this.configurationService.valorHoras);
    // El día de descanso se gana cuando se ha trabajado la jornada semanal


    //Obtengo el valor de la hora dependiendo de los parámetros 
    mesLiquidar.valorHora = valorHora;
    let esFestivo = false;
    for (let i = 0; i < CONST.diasMes; i++) {
      let j = (i + diaIndex) % 7;
      let valorHoraDia = ValorHoras.minstructor(i, CONST.diasSemanaName[j], (i+1) +' '+ CONST.diasSemanaLabel[j], parametros.reformaName, parametros.reformaLabel, parametros.reformaIndex, parametros.style, 0, 0);
      valorHoraDia.valorHora = valorHora;
      //validar si no tiene horas ese día se debe contabilizar como jornada diurna normal
      //pues corresponde al día de descanso 
      //El indice 7 contiene el total de horas de la semana
      if (horasSemana[j].totalHoras === 0 && horasSemana[7].totalHoras >= parametros.jornadaLaboralSemanal) {
        //los días de descanso se pagan como una Jornada Laboral Diurna normal.
        mesLiquidar.horasDiurnas += parametros.jornadaLaboralDiaria;
        valorHoraDia.horasDiurnas = parametros.jornadaLaboralDiaria;
        valorHoraDia.label = valorHoraDia.label + CONST.descansoRemunerado.label;
        this.liquidarValorHoras(valorHoraDia, parametros);
        //Agregar el dia
        
        horasDia.push(valorHoraDia);
        continue;
      }
      //verifico si el día e festivo y lo marco como tal 
      if (mes.festivos.find(f => (f - 1) == i) != undefined) {
        valorHoraDia.label = valorHoraDia.label + CONST.festivo.label;
        //es festivo depende de la petición
        esFestivo = (peticion.festivos?true:false);
      }
      //caso especial liquidar un domingo o un día festivo
      if (horasSemana[j].name === CONST.diaDomingo[0] || esFestivo) {
        //suma las horas diurnas al domingo. 
        mesLiquidar.horasDiurnasDominicalesOFestivos += horasSemana[j].horasDiurnas;
        mesLiquidar.horasNocturnasDominicalesFestivos += horasSemana[j].horasNocturnas;
        mesLiquidar.horasExtrasDiurnasDominicalesFestivas += horasSemana[j].horasExtraDiurna;
        mesLiquidar.horasExtrasNocturnasDominicalesFestivas += horasSemana[j].horasExtraNocturna;
        //guardando datos en cada día 
        valorHoraDia.horasDiurnasDominicalesOFestivos = horasSemana[j].horasDiurnas;
        valorHoraDia.horasNocturnasDominicalesFestivos = horasSemana[j].horasNocturnas;
        valorHoraDia.horasExtrasDiurnasDominicalesFestivas = horasSemana[j].horasExtraDiurna;
        valorHoraDia.horasExtrasNocturnasDominicalesFestivas = horasSemana[j].horasExtraNocturna;
        if(esFestivo){
          valorHoraDia.label = valorHoraDia.label + CONST.festivoRemunerado.label;
        }
      } else {
        //Si no tabaja los festivos y no es ni dominical ni festivo lo liquido como un día normal: 
        mesLiquidar.horasDiurnas += horasSemana[j].horasDiurnas;
        mesLiquidar.horasExtraDiurna += horasSemana[j].horasExtraDiurna;
        mesLiquidar.horasNocturnas += horasSemana[j].horasNocturnas;
        mesLiquidar.horasExtraNocturna += horasSemana[j].horasExtraNocturna;
        //guardando datos en cada día 
        valorHoraDia.horasDiurnas = horasSemana[j].horasDiurnas;
        valorHoraDia.horasExtraDiurna = horasSemana[j].horasNocturnas;
        valorHoraDia.horasNocturnas = horasSemana[j].horasExtraDiurna;
        valorHoraDia.horasExtraNocturna = horasSemana[j].horasExtraNocturna;
      }
      this.liquidarValorHoras(valorHoraDia, parametros);
      //Agregar el dia
      horasDia.push(valorHoraDia);
      //hacemos festivo falso para que solo vuelva a entrar a los festivos cuando encuentre otro festivo. 
      esFestivo = false;
    }
    this.liquidarValorHoras(mesLiquidar, parametros);
    mesLiquidar.id = 1;
    mesLiquidar.label = mes.label;
    mesLiquidar.name = mes.nombre;
    mesLiquidar.festivos = mes.festivos.length;
    return mesLiquidar;
  }




  /**
   * Liquida las horas totales de un mes 
   * @param horasSemana
   */
  public contarHorasMes(horasSemana: HorasSemana[], mes: MesModel, peticion: Peticion, valorHora: number, parametroId: number): ValorHoras {

    let parametros = this.parametros[parametroId];
    //liquida los días empezando por el primer día del mes
    //Todos los meses se liquidan a 30 días
    let diaIndex = CONST.diasSemanaName.findIndex(d => d === mes.diaInicial)
    let mesLiquidar = structuredClone(this.configurationService.valorHoras);
    // El día de descanso se gana cuando se ha trabajado la jornada semanal
    let jornadaSemanalIngresada = 0;
    horasSemana.forEach(d => jornadaSemanalIngresada += d.totalHoras);

    //Obtengo el valor de la hora dependiendo de los parámetros 
    mesLiquidar.valorHora = valorHora;
    let esFestivo = false;
    for (let i = 0; i < CONST.diasMes; i++) {
      let j = (i + diaIndex) % 7;
      //validar si no tiene horas ese día se debe contabilizar como jornada diurna normal
      //pues corresponde al día de descanso 
      if (horasSemana[j].totalHoras === 0 && jornadaSemanalIngresada >= parametros.jornadaLaboralSemanal) {
        //los días de descanso se pagan como una Jornada Laboral Diurna normal.
        mesLiquidar.horasDiurnas += parametros.jornadaLaboralDiaria;
        continue;
      }
      //verifico si el día e festivo y lo marco como tal 
      if (mes.festivos.find(f => (f - 1) == i) != undefined) {
        //es festivo depende de la petición
        esFestivo = (peticion.festivos?true:false);
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
    this.liquidarValorHoras(mesLiquidar, parametros);
    mesLiquidar.id = 1;
    mesLiquidar.label = mes.label;
    mesLiquidar.name = mes.nombre;
    mesLiquidar.festivos = mes.festivos.length;
    return mesLiquidar;
  }


  private liquidarValorHoras(valorHoras: ValorHoras, parametros: Parametros) {
    //totalizar las horas del mes: 
    valorHoras.totalHoras += valorHoras.horasDiurnas;
    valorHoras.totalHoras += valorHoras.horasExtraDiurna;
    valorHoras.totalHoras += valorHoras.horasNocturnas;
    valorHoras.totalHoras += valorHoras.horasExtraNocturna;
    valorHoras.totalHoras += valorHoras.horasDiurnasDominicalesOFestivos;
    valorHoras.totalHoras += valorHoras.horasNocturnasDominicalesFestivos;
    valorHoras.totalHoras += valorHoras.horasExtrasDiurnasDominicalesFestivas;
    valorHoras.totalHoras += valorHoras.horasExtrasNocturnasDominicalesFestivas;

    //con el valor de la hora liquido el mes según los factores definidos en cada parámetro. 
    valorHoras.valorHorasDiurnas = valorHoras.horasDiurnas * (valorHoras.valorHora * parametros.horasDiurnas.factor);
    valorHoras.valorHorasExtraDiurna = valorHoras.horasExtraDiurna * (valorHoras.valorHora * parametros.horasExtrasDiurnas.factor);
    valorHoras.valorHorasNocturnas = valorHoras.horasNocturnas * (valorHoras.valorHora * parametros.horasNocturnas.factor);
    valorHoras.valorHorasExtraNocturna = valorHoras.horasExtraNocturna * (valorHoras.valorHora * parametros.horasExtrasNocturnas.factor);
    valorHoras.valorHorasDiurnasDominicalesOFestivos = valorHoras.horasDiurnasDominicalesOFestivos * (valorHoras.valorHora * parametros.horasDiurnasDominicalesOFestivos.factor);
    valorHoras.valorHorasNocturnasDominicalesFestivos = valorHoras.horasNocturnasDominicalesFestivos * (valorHoras.valorHora * parametros.horasNocturnasDominicalesFestivos.factor);
    valorHoras.valorHorasExtrasDiurnasDominicalesFestivas = valorHoras.horasExtrasDiurnasDominicalesFestivas * (valorHoras.valorHora * parametros.horasExtrasDiurnasDominicalesFestivas.factor);
    valorHoras.valorHorasExtrasNocturnasDominicalesFestivas = valorHoras.horasExtrasNocturnasDominicalesFestivas * (valorHoras.valorHora * parametros.horasExtrasNocturnasDominicalesFestivas.factor);

    //totalizar valor las horas del mes: 
    valorHoras.totalValorHoras += valorHoras.valorHorasDiurnas;
    valorHoras.totalValorHoras += valorHoras.valorHorasExtraDiurna;
    valorHoras.totalValorHoras += valorHoras.valorHorasNocturnas;
    valorHoras.totalValorHoras += valorHoras.valorHorasExtraNocturna;
    valorHoras.totalValorHoras += valorHoras.valorHorasDiurnasDominicalesOFestivos;
    valorHoras.totalValorHoras += valorHoras.valorHorasNocturnasDominicalesFestivos;
    valorHoras.totalValorHoras += valorHoras.valorHorasExtrasDiurnasDominicalesFestivas;
    valorHoras.totalValorHoras += valorHoras.valorHorasExtrasNocturnasDominicalesFestivas;
    valorHoras.style = parametros.style;
    valorHoras.reformaLabel = parametros.reformaLabel;
    valorHoras.reformaName = parametros.reformaName;
    valorHoras.reformaIndex = parametros.reformaIndex;
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
    let categorias = Array<string[]>();
    let colors = Array<string>();
    this.parametros.forEach(p => {
      categorias.push([p.reformaLabel, p.reformaAutor]);
      colors.push(p.colorFill);
    });
    //generar datos: 
    let data = Array<number>();

    valorHoras.forEach(vh => {
      data.push(vh.totalValorHoras);

    });
    return {
      chartLabel: "Ingreso mensual proyectado",
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
