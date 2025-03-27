import { MesModel } from "../mes-model/mes-model";

/**
 * Información de un año necesaria para simular su liquidación
 */
export class AgnoModel {

    constructor(
        public agno: number,
        public diaInicial: string,
        public meses: MesModel[]
    ) { }

}
