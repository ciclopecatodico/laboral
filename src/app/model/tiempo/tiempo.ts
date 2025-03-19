export class Tiempo {

    constructor(
        public tiempo ?: string, 
        public horas ?: number,
        public minutos ?: number,
        public jornada ?: string,
    ){}


    public setByTiempo(){
        if(this.tiempo){
            let time = this.tiempo.split(' ');
            this.jornada = time[1];
            time = time[0].split(':');
            this.horas = Number(time[0]);
            this.minutos = Number(time[1]);
        }
    }

    /**
     * Restamos this other
     * @param other Tiempo
     */
    public substract(other: Tiempo):Tiempo{
        let result = new Tiempo();
        if(other){
            if(other.jornada === this.jornada){
                if(other.horas && this.horas){
                    result.horas = this.horas-other.horas;
                }
                if(other.minutos && this.minutos){
                    result.minutos = this.minutos-other.minutos;
                }
            }
            
        }
        return result;
    }

}
