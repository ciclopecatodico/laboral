import { SelectItem } from "../selectItem/SelectItem";
import { Tiempo } from "../tiempo/tiempo";

export class Turno {

    constructor(
        public id ? :string,
        public inicio ?: string,
        public fin ?: string, 
        public dias ?: SelectItem[]
    ){}

}
