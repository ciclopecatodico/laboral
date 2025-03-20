import { Turno } from "../turno/turno";

export class Peticion {

    constructor(
        public nombres : string, 
        public salario : number,
        public valorHora ?:number,
        public edad ?: number,
        public experiencia ?: number,
        public sexo ? :string,
        public sena ?: boolean,
        public etapa ?: string,
        public domingos? : number,
        public festivos? : number,
        public turnos? : Turno[]
    ){}
}
