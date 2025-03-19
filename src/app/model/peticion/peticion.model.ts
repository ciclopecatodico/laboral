import { Turno } from "../turno/turno";

export class Peticion {

    constructor(
        public nombres ?: string, 
        public salario ?: number,
        public sena ?: boolean,
        public etapa ?: string,
        public domingos? : number,
        public festivos? : number,
        public turnos? : Turno[]
    ){}
}
