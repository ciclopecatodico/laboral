/**
 * Almacena la liquidacion de un mes o de un año 
 */
export class ValorHoras {

    constructor(
        public id?: number, //puede ser el indice del mes 
        public name?: string, //nombre del mes
        public label?: string, //etiqueta a mostrar en la tabla
        public reformaName?: string, //reforma con la que se liquidaron las horas
        public reformaLabel?: string, //Etiqueta a usar para la reforma
        public style?: string, //estilo css a aplicar 

        public festivos?: number,    //Festivos que trabajo la persona
        public dominicales?: number,    //Dominicales que trabajo la persona

        public horasDiurnas?: number,
        public horasNocturnas?: number,
        public horasExtraDiurna?: number,
        public horasExtraNocturna?: number,
        public horasDiurnasDominicalesOFestivos?: number,
        public horasNocturnasDominicalesFestivos?: number,
        public horasExtrasDiurnasDominicalesFestivas?: number,
        public horasExtrasNocturnasDominicalesFestivas?: number,
        public totalHoras?: number,

        public valorHora?: number,
        public valorHorasDiurnas?: number,
        public valorHorasNocturnas?: number,
        public valorHorasExtraDiurna?: number,
        public valorHorasExtraNocturna?: number,
        public valorHorasDiurnasDominicalesOFestivos?: number,
        public valorHorasNocturnasDominicalesFestivos?: number,
        public valorHorasExtrasDiurnasDominicalesFestivas?: number,
        public valorHorasExtrasNocturnasDominicalesFestivas?: number,
        public totalValorHoras?: number,
    ) { }
}
