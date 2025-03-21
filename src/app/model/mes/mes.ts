import { Horas } from "../horas/horas";
import { Hora } from "../hora/hora";

export class Mes {

    constructor(
        public name: string,
        public semana: Horas[],
        public horas: Hora[],
    ) { }

}
