import { BarChartCompuesto } from "../../charts/bars-chart/bars-chart-compuesto";
import { BarChartSimple } from "../../charts/bars-chart/bars-chart-simple";
import { DonutChart } from "../../charts/donut-chart/donut-chart-options";
import { HorasSemana } from "../../liquidacion/horas-semana/horas-semana";

export class Semana {

    constructor(
        public horasSemana: HorasSemana[],
        public donas?: DonutChart[],
        public barrasHorasTipo?: BarChartCompuesto,  //horas por tipo agrupadas por reforma
        public barrasHorasPonderadas?: BarChartCompuesto, //horas ponderadas por el recargo agrupadas por reforma
        public barrasTotal?:BarChartSimple //total percibido por horas
    ) { }
}
