import { ParametroHora } from "./parametro-hora";

/**
 * Almacena los parámetros para calcular 
 */
export class Parametros {

    constructor(
        public id : number,
        public reformaLabel : string,
        public reformaName : string,
        public reformaAutor: string,
        public reformaIndex : number,
        public angoInicio : number,
        public style : string,
        public colorFill: string,
        public colorStroke: string,
        public descripcion : string,
        public link: string, 
        public smlv : number,
        public smlvHora : number,
        public subsidioTransporte: number, 
        public senaLectiva : number,
        public senaProductiva : number,
        public diasMes : number,
        public diaInicio :string,
        public diaFin : string,
        public nocheInicio : string,
        public nocheFin : string,
        public jornadaLaboralDiaria : number,
        public jornadaLaboralSemanal : number,
        public jornadaLaboralMensual : number,
        public jornadaLaboralDiariaMaxima : number,
        public maximoHorasExtras : number,
        public horasDiurnas : ParametroHora,
        public horasNocturnas: ParametroHora,
        public horasExtrasDiurnas : ParametroHora,
        public horasExtrasNocturnas : ParametroHora,
        public horasDiurnasDominicalesOFestivos: ParametroHora,
        public horasNocturnasDominicalesFestivos: ParametroHora,
        public horasExtrasDiurnasDominicalesFestivas : ParametroHora,
        public horasExtrasNocturnasDominicalesFestivas : ParametroHora,
    ){}

}
