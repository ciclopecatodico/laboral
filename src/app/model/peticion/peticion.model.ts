import { Turno } from "../turno/turno";

export class Peticion {

    constructor(
        public nombres: string,
        public salario: number,
        public nocturna?: boolean,
        public edad?: number,
        public experiencia?: number,
        public sexo?: string,
        public sena?: boolean,
        public etapa?: string,
        public duracion?: number,
        public festivos?: boolean,
        public mesId?: number,
        public jornadaSemanal?: number,
        public turnos?: Turno[]
    ) { }
}
