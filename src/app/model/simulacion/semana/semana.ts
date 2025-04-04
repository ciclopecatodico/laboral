import { BarrasSimpleDatos } from "../../graficos/barras/baras-simple-datos";
import { DonaDatos } from "../../graficos/dona/dona-datos";
import { HorasSemana } from "../../liquidacion/horas-semana/horas-semana";

export class Semana {

    constructor(
        public horasSemana: HorasSemana[],
        public donas?: DonaDatos[],
        public barrasTotal?: BarrasSimpleDatos,  //horas por tipo agrupadas por reforma
    ) { }
}
