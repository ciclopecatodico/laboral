import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';
import { Peticion } from '../../../model/peticion/peticion.model';
import { ValorHoras } from '../../../model/liquidacion/valor-horas/valor-horas';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { LiquidadorMesService } from '../liquidador-mes/liquidador-mes.service';
import { Laboral } from '../../../model/simulacion/laboral/laboral';
import { BarrasSimpleDatos } from '../../../model/graficos/barras/baras-simple-datos';


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
  public totalSinReforma = 0;
  public totalConreforma = 0;

  /**
* Horas registradas para cada semana
*/
  public total1950: ValorHoras;
  public total789: ValorHoras;
  public total2101: ValorHoras;
  public total2025: ValorHoras;

  /**
   * Guarda la liquidación de la historia laboral. 
   */
  public laboral1950 = new Array<ValorHoras>;
  public laboral789 = new Array<ValorHoras>;
  public laboral2101 = new Array<ValorHoras>;
  public laboral2025 = new Array<ValorHoras>;


  public totales = new Array<ValorHoras>;

  constructor(configurationService: ConfigurationService, liquidadorMesService: LiquidadorMesService) {
    this.configurationService = configurationService;
    this.liquidadorMesService = liquidadorMesService;
    this.parametros = configurationService.parametros;
    this.total1950 = structuredClone(this.configurationService.valorHoras);
    this.total789 = structuredClone(this.configurationService.valorHoras);
    this.total2101 = structuredClone(this.configurationService.valorHoras);
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
    this.laboral2101 = this.generarAngos(this.total2101);
    this.laboral2025 = this.generarAngos(this.total2025);
    //Despues de simular los años debo calcular las participaciones por reformas


    //limpio totales para volver a guardar los datos.
    this.totales = new Array<ValorHoras>;
    //calcular totales para cada simulación. 
    this.calcularTotales(this.laboral1950);
    this.calcularTotales(this.laboral789);
    this.calcularTotales(this.laboral2101);
    this.calcularTotales(this.laboral2025);
    let valorHoras = new Array<ValorHoras>();

    //retornamos un arreglo que contiene todos los agños calculados. 
    valorHoras = [...this.laboral1950, ...this.laboral789, ...this.laboral2101, ...this.laboral2025];

    let barrasSimplesDatos = this.generarBarrasSimpleDatos(this.totales);
    let barrasAcumulados = this.liquidarAcumulados();
    let barraComparacion = this.generarBarrasSimpleAcumulados();

    return new Laboral(this.inicioSimu, this.finalSimu, peticion.salario, valorHoras, barraComparacion, barrasAcumulados);
  }

  /**
   * Filtramos el arreglo de horas del año y nos quedamos solo con el total para cada tipo de reforma. 
   * @param agno Arreglo con todas las horas mensuales de los diferentes tipos de reformas
   */
  private filtraTotalPorReforma(agno: ValorHoras[]) {
    this.total1950 = agno.filter(h => (h.reformaName === CONST.reforma1950.reforma && h.name === CONST.total.id))[0];
    this.total789 = agno.filter(h => (h.reformaName === CONST.reforma789.reforma && h.name === CONST.total.id))[0];
    this.total2101 = agno.filter(h => (h.reformaName === CONST.reforma2101.reforma && h.name === CONST.total.id))[0];
    this.total2025 = agno.filter(h => (h.reformaName === CONST.reforma2025.reforma && h.name === CONST.total.id))[0];
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
    if (peticion.experiencia != undefined && peticion.experiencia >= 0) {
      this.inicioSimu = CONST.agnoActual - peticion.experiencia;
    } else {
      this.inicioSimu = CONST.agnoActual;
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
    total.label = CONST.total.label;
    total.name = CONST.total.id;
    total.reformaLabel = agno[0].reformaLabel;
    total.reformaName = agno[0].reformaName;
    total.reformaIndex = agno[0].reformaIndex
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
    this.totales.push(total);
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
      chartLabel: "Ingresos totales Vida Laboral Proyectado",
      dataLabel: "Ingresos",
      colors: colors,
      data: data,
      categories: categorias,
      labelColor: ['var(--GrapLabel)'],
      prefix: '',
      sufix: ' M',
      factor: 100000,
      decimales: 10,
      separador: '.'
    };
  }


  private liquidarAcumulados(): ApexAxisChartSeries {
    let sum1950 = 0;
    let sum789 = 0;
    let sum2101parcial = 0;
    let sum2101total = 0;
    let sum2025 = 0;
    for (let i = 0; i < this.laboral1950.length - 1; i++) {
      //sumar todo lo anterior hasta la reforma de uribe
      let vh1950 = this.laboral1950[i];
      let agno = parseInt(vh1950.name);
      if (agno < this.parametros[1].angoInicio) {
        sum1950 += vh1950.totalValorHoras;
      }
      //sumar entre la reforma de uribe y la de duque
      let vh789 = this.laboral789[i];
      agno = parseInt(vh789.name);
      if (agno >= this.parametros[1].angoInicio && agno < this.parametros[2].angoInicio) {
        sum789 += vh789.totalValorHoras;
      }
      //sumar entre la reforma de duque y petro
      let vh2101 = this.laboral2101[i];
      agno = parseInt(vh2101.name);
      if (agno >= this.parametros[2].angoInicio && agno < this.parametros[3].angoInicio) {
        sum2101parcial += vh2101.totalValorHoras;
      }
      //sumar como si no se aprobara la reforma de petro
      if (agno >= this.parametros[2].angoInicio) {
        sum2101total += vh2101.totalValorHoras;
      }
      //sumar solo reforma petro
      let vh2025 = this.laboral2025[i];
      agno = parseInt(vh2101.name);
      if (agno >= this.parametros[3].angoInicio) {
        sum2025 += vh2025.totalValorHoras;
      }
    }


    //Estos son los totales con y sin reforma
    this.totalSinReforma = Math.round(sum1950 + sum789 + sum2101total);
    this.totalConreforma = Math.round(sum1950 + sum789 + sum2101parcial + sum2025);
    
    sum1950 = Math.round(sum1950) ;
    sum789 = Math.round(sum789) ;
    sum2101parcial = Math.round(sum2101parcial);
    sum2101total = Math.round(sum2101total);
    sum2025 = Math.round(sum2025);

    let tot1950 = Math.round(this.laboral1950[this.laboral1950.length - 1].totalValorHoras ) ;
    let tot789 = Math.round(this.laboral789[this.laboral789.length - 1].totalValorHoras );
    let tot2101 = Math.round(this.laboral2101[this.laboral1950.length - 1].totalValorHoras ) ;
    let tot2025 = Math.round(this.laboral2025[this.laboral1950.length - 1].totalValorHoras ) ;


    let data = [
      {
        name: "Ley 50 1990",
        data: [tot1950, 0, 0, 0, sum1950, sum1950]
      },
      {
        name: "Ley 789 de 2002",
        data: [0, tot789, 0, 0, sum789, sum789]
      },
      {
        name: "Ley 2101 de 2021",
        data: [0, 0, tot2101, 0, sum2101total, sum2101parcial]
      },
      {
        name: "Propuesta 2025",
        data: [0, 0, 0, tot2025, 0, sum2025]
      }
    ];

    return data;
  }


  private generarBarrasSimpleAcumulados(): BarrasSimpleDatos {
    //generar categorias: 
    let categorias = Array<string[]>();
    let colors = Array<string>();
    this.parametros.forEach(p => {
      categorias.push([p.reformaLabel, p.reformaAutor]);
      colors.push(p.colorFill);
    });
    //generar datos: 
    let data = [this.totalSinReforma, this.totalConreforma, this.totalConreforma - this.totalSinReforma];
    return {
      chartLabel: "Ingresos totales historia laboral simulados",
      dataLabel: "Ingresos",
      colors: ['var(--U789B)', 'var(--P2025B)', 'var(--U789B)'],
      data: data,
      categories: ["Sin Reforma", "Con Reforma", "Diferencia"],
      labelColor: ['var(--GrapLabel)'],
      prefix: '',
      sufix: ' M',
      factor: 100000,
      decimales: 10,
      separador: '.'
    };
  }
}
