import { BarrasSimpleDatos } from "../../charts/barras/baras-simple-datos";
import { BarChartCompuesto } from "../../charts/bars-chart/bars-chart-compuesto";
import { BarChartSimple } from "../../charts/bars-chart/bars-chart-simple";
import { ValorHoras } from "../../liquidacion/valor-horas/valor-horas";

export class Laboral {

    constructor(
        public inicio: number,
        public fin: number,
        public salario: number,
        public valores: ValorHoras[],
        public barrasSimpleDatos ?: BarrasSimpleDatos,//total percibido por horas
        public barrasHorasPonderadas?: BarChartCompuesto, //horas ponderadas por el recargo agrupadas por reforma
    ) { }
}
