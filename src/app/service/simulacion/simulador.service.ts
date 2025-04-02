import { Injectable } from "@angular/core";
import { Peticion } from "../../model/peticion/peticion.model";
import { Semana } from "../../model/simulacion/semana/semana";
import { Agno } from "../../model/simulacion/agno/ango";
import { Mes } from "../../model/simulacion/mes/mes";
import { Laboral } from "../../model/simulacion/laboral/laboral";
import { LiquidadorSemanaService } from "../liquidador/liquidador-semana/liquidador-semana.service";
import { LiquidadorMesService } from "../liquidador/liquidador-mes/liquidador-mes.service";
import { LiquidadorMesesService } from "../liquidador/liquidador-meses/liquidador-meses.service";
import { LiquidadorAgnosService } from "../liquidador/liquidador-agnos/liquidador-agnos.service";
import { StorageService } from "../storage/storage.service";


/**
 * Liquida las horas totales diarias para una semana segun los horarios definidos en una reforma. 
 */
@Injectable({
    providedIn: 'root'
})
export class SimuladorService {


    public peticion: Peticion;
    public semana: Semana;
    public agno: Agno;
    public mes: Mes;
    public laboral: Laboral;


    private storageService: StorageService;
    //Se encarga de liquidar las horas de una semana 
    public liquidadorSemanaService: LiquidadorSemanaService;
    //Se encarga de liquidar un mes
    public liquidadorMesService: LiquidadorMesService;
    //Se encarga de liquidar un año, conjunto de 12 meses
    public liquidadorMesesService: LiquidadorMesesService;
    //Se encarga de liquidar muchos años
    public liquidadorAgnosService: LiquidadorAgnosService;


    constructor(storageService: StorageService, liquidadorSemanaService: LiquidadorSemanaService,
        liquidadorMesService: LiquidadorMesService,
        liquidadorMesesService: LiquidadorMesesService,
        liquidadorAgnosService: LiquidadorAgnosService) {
        this.peticion = new Peticion('', 1);
        this.storageService = storageService;
        this.liquidadorSemanaService = liquidadorSemanaService;
        this.liquidadorMesService = liquidadorMesService;
        this.liquidadorMesesService = liquidadorMesesService;
        this.liquidadorAgnosService = liquidadorAgnosService;

        this.semana = Object.create(Semana);
        this.agno = Object.create(Agno)
        this.mes = Object.create(Mes)
        this.laboral = Object.create(Laboral)
    }

    simularSemana(peticion: Peticion) {
        console.log("Simular Semana");
        this.peticion = peticion;
        this.semana = this.liquidadorSemanaService.simular(this.peticion);
        this.storageService.save('semana', this.semana);
        this.storageService.save('peticion', this.peticion);
    }

    simularMes(peticion: Peticion) {
        //ya tengo la semana liquidada en este componente 
        //la debo usar para calcular el mes
        this.peticion = peticion;
        this.semana = this.storageService.retrieve('semana');
        this.mes = this.liquidadorMesService.simularMes(this.semana.horasSemana, this.peticion);
        this.storageService.save('mes', this.mes);
        this.storageService.save('peticion', this.peticion);
    }


    simularAgno(peticion: Peticion) {
        //ya tengo la semana liquidada en este componente 
        //la debo usar para calcular el mes 
        this.peticion = peticion;
        this.semana = this.storageService.retrieve('semana');
        this.agno = this.liquidadorMesesService.simularMeses(this.semana.horasSemana, this.peticion);
        this.storageService.save('agno', this.agno);
        this.storageService.save('peticion', this.peticion);
    }

    simularLaboral(peticion: Peticion) {
        this.peticion = peticion;
        this.agno = this.storageService.retrieve('agno');
        this.laboral = this.liquidadorAgnosService.simularAngos(this.agno.meses, this.peticion);
        this.storageService.save('laboral', this.laboral);
        this.storageService.save('peticion', this.peticion);
    }


}