import { SelectItem } from "../selectItem/SelectItem";
import { Tiempo } from "../tiempo/tiempo";

export class Turno {

    constructor(
        public id :number,
        public nombre :string,
        public inicio : string,
        public fin : string, 
        public valido : boolean,
        public dias ?: string[]
    ){}

}
