import { BarChartCompuesto } from "../../charts/bars-chart/bars-chart-compuesto";
import { BarChartSimple } from "../../charts/bars-chart/bars-chart-simple";
import { ValorHoras } from "../../liquidacion/valor-horas/valor-horas";

export class Agno {

    constructor(
        public salario: number,
        public meses: ValorHoras[],
        public barrasHorasPonderadas?: BarChartCompuesto, //horas ponderadas por el recargo agrupadas por reforma
        public barrasTotal?: BarChartSimple //total percibido por horas
    ) { }
}
