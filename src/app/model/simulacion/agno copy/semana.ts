import { BarChartCompuesto } from "../../charts/bars-chart/bars-chart-compuesto";
import { DonutChart } from "../../charts/donut-chart/donut-chart-options";
import { HorasSemana } from "../../liquidacion/horas-semana/horas-semana";

export class Semana {

    constructor(
        public donas: DonutChart[],
        public barrasCompuesto : BarChartCompuesto[],
        public horasSemana:HorasSemana[]
    ){}
}
