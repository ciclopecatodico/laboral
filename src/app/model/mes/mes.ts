import { Dia } from "../dia/dia";
import { Hora } from "../hora/hora";

export class Mes {

    constructor(
        public name: string,
        public semana: Dia[],
        public horas: Hora[],
    ) { }

}
