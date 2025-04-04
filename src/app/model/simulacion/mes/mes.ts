import { BarrasSimple } from "../../charts/barras/baras-simple";
import { BarrasSimpleDatos } from "../../charts/barras/baras-simple-datos";
import { BarChartCompuesto } from "../../charts/bars-chart/bars-chart-compuesto";
import { ValorHoras } from "../../liquidacion/valor-horas/valor-horas";

export class Mes {

    constructor(
        public salario: number,
        public meses: ValorHoras[],
        public barrasSimpleDatos?: BarrasSimpleDatos, //total percibido por horas
        public barrasHorasPonderadas?: BarChartCompuesto, //horas ponderadas por el recargo agrupadas por reforma
        
    ) { }
}
