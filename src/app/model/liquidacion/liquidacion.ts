import { Hora } from "../hora/hora";
import { Peticion } from "../peticion/peticion.model";

export class Liquidacion {

        constructor(
            public id : number,
            public name : string,
            public descripcion : string,
            public diaInicio :string,
            public diaFin : string,
            public nocheInicio : string,
            public nocheFin : string,
            public jornadaLaboralDiaria : number,
            public jornadaLaboralSemanal : number,
            public horasDiurnas : number,
            public horasNocturnas: number,
            public horasDiurnaDominicalesOFestivos: number,
            public horasNocturnasDominicalesFestivos: number,
            public horasExtrasDiurno : number,
            public horasExtrasNocturno : number,
            public horasExtrasDiurnasDominicalesFestivos : number,
            public horasExtrasNocturnasDominicalesFestivos : number,
        ){}
}
