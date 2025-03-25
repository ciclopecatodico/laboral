export class Liquidacion {

        constructor(
            public id : number,
            public valorHora : string,
            public valorHorasDiurnas: number,
            public valorHorasNocturnas: number,
            public valorHorasExtraDiurna: number,
            public valorHorasExtraNocturna: number,
            public valorHorasDiurnasDominicalesOFestivos: number,
            public valorHorasNocturnasDominicalesFestivos: number,
            public valorHorasExtrasDiurnasDominicalesFestivas : number,
            public valorHorasExtrasNocturnasDominicalesFestivas : number,
            public totalHoras: number,
        ){}
}
