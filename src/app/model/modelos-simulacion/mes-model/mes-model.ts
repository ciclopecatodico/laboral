export class MesModel {

    constructor(
        public id: number,
        public nombre: string,
        public label: string,
        public diaInicial: string,
        public festivos: number[],
        public dias: number,
    ) { }

}
