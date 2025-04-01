import { ChartOptions } from "../../charts/charts-options/chart-options";
import { HorasSemana } from "../../liquidacion/horas-semana/horas-semana";

export class Semana {

    constructor(
        public charts: ChartOptions[],
        public horasSemana:HorasSemana[]
    ){}
}
