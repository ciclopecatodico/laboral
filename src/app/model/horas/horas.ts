
export class Horas {

    constructor(
        public name: string,
        public label: string,
        public reforma : string, //reforma con la que se liquidaron las horas
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
