import { BarrasSimpleDatos } from "../../graficos/barras/baras-simple-datos";
import { Series } from "../../graficos/series/series";
import { ValorHoras } from "../../liquidacion/valor-horas/valor-horas";

export class Laboral {

    constructor(
        public inicio: number,
        public fin: number,
        public salario: number,
        public valores: ValorHoras[],
        public barrasSimpleDatos ?: BarrasSimpleDatos,//total percibido por horas
        public barrasAcumulado ? : ApexAxisChartSeries
    ) { }
}
