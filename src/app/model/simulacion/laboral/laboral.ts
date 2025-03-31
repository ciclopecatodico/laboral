import { ValorHoras } from "../../liquidacion/valor-horas/valor-horas";

export class Laboral {

    constructor(
        public inicio:number,
        public fin:number,
        public salario:number,
        public valores:ValorHoras[]
    ){}
}
