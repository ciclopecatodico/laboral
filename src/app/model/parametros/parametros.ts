
/**
 * Almacena los parámetros para calcular 
 */
export class Parametros {

    constructor(
        public id : number,
        public name : string,
        public reforma : string,
        public style : string,
        public descripcion : string,
        public diasMes : number,
        public diaInicio :string,
        public diaFin : string,
        public nocheInicio : string,
        public nocheFin : string,
        public jornadaLaboralDiaria : number,
        public jornadaLaboralSemanal : number,
        public jornadaLaboralMensual : number,
        public maximoHorasExtras : number,
        public horasDiurnas : number,
        public horasNocturnas: number,
        public horasDiurnasDominicalesOFestivos: number,
        public horasNocturnasDominicalesFestivos: number,
        public horasExtrasDiurnas : number,
        public horasExtrasNocturnas : number,
        public horasExtrasDiurnasDominicalesFestivas : number,
        public horasExtrasNocturnasDominicalesFestivas : number,
    ){}

}
