import { Horas } from "../horas/horas";

export class Mes {

    constructor(
        public id : number,
        public index : number, //indice en el arreglo de configuraciones
        public label : string,
        public name: string,
        public reforma : string, //reforma con la que se liquidaron las horas
        public style : string, 
        public festivos: number, //Cantidad de festivos liquidados en el mes
        public semana: Horas[], //conteo de horas por semana
        public mes : Horas, //conteo de horas para el mes
    ) { }

}
