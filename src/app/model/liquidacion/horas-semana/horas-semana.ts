
export class HorasSemana {

    constructor(
        public name: string,
        public label: string,    //si el dia es domingo o festivo sus horas serán especiales, se valida al liquidar el mes! 
        public reformaName : string, //reforma con la que se liquidaron las horas
        public reformaLabel: string, //Etiqueta a usar para la reforma
        public style : string,
        public horarios: string[],
        public horasDiurnas: number,
        public horasNocturnas: number,
        public horasExtraDiurna: number,
        public horasExtraNocturna: number,
        public totalHoras: number,
    ) { }

}
