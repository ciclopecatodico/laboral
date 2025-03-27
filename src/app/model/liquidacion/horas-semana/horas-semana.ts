
export class HorasSemana {

    constructor(
        public name: string,
        public label: string,
        public reformaName : string, //reforma con la que se liquidaron las horas
        public reformaLabel: string, //Etiqueta a usar para la reforma
        public style : string,
        public horarios: string[],
        public horasDiurnas: number,
        public horasNocturnas: number,
        public horasExtraDiurna: number,
        public horasExtraNocturna: number,
        public horasDiurnasDominicalesOFestivos: number,
        public horasNocturnasDominicalesFestivos: number,
        public horasExtrasDiurnasDominicalesFestivas : number,
        public horasExtrasNocturnasDominicalesFestivas : number,
        public totalHoras: number,
    ) { }

}
