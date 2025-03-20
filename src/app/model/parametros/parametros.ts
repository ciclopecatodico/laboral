
/**
 * Almacena los parámetros para calcular 
 */
export class Parametros {

    
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
        public jornadaLaboralMensual : number,
        public horasDiurnas : number,
        public horasNocturnas: number,
        public horasDiurnasDominicalesOFestivos: number,
        public horasNocturnasDominicalesFestivos: number,
        public extrasDiurno : number,
        public extrasNocturno : number,
        public extrasDiurnasDominicalesFestivos : number,
        public extrasNocturnasDominicalesFestivos : number,
    ){}

}
