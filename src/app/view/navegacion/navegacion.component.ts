import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peticion } from '../../model/peticion/peticion.model';
import { HorasSemana } from '../../model/liquidacion/horas-semana/horas-semana';
import { LiquidadorSemanaService } from '../../service/liquidador/liquidador-semana/liquidador-semana.service';
import { LiquidadorMesesService } from '../../service/liquidador/liquidador-meses/liquidador-meses.service';
import { ValorHoras } from '../../model/liquidacion/valor-horas/valor-horas';

@Component({
  selector: 'app-navegacion',
  standalone: false,
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css'
})
export class NavegacionComponent {


  public peticion: Peticion;

  //Mostrar o quitar componentes 
  public mostrarParametros = false;
  public mostrarInicialForm = true;
  public mostrarSemanaSimulacion = false;
  public mostrarMesForm = false;
  public mostrarMesSimulacion = false;
  public mostrarAgnoSimulacion = false;
  public mostrarAgnoForm = false;

  public volverAEtapa = 'inicial'; //inicial|sena|
  public semana = Array<HorasSemana>();
  public mes = Array<ValorHoras>();
  //Se encarga de liquidar las horas de una semana 
  public liquidadorSemanaService: LiquidadorSemanaService;
  //Se encarga de liquidar un año, conjunto de 12 meses
  public liquidadorMesesService: LiquidadorMesesService;


  constructor(liquidadorSemanaService: LiquidadorSemanaService, liquidadorMesService: LiquidadorMesesService) {
    this.peticion = new Peticion('', 1);
    this.liquidadorSemanaService = liquidadorSemanaService;
    this.liquidadorMesesService = liquidadorMesService;
  }


  simularSemana(peticion: Peticion) {
    this.mostrarInicialForm = false;
    this.peticion = peticion;
    this.semana = this.liquidadorSemanaService.liquidar(this.peticion);
    this.mostrarSemanaSimulacion = true;
    this.mostrarMesForm = true;
    this.mostrarAgnoSimulacion = false;
    this.mostrarAgnoForm = false;
    this.volverAEtapa = 'inicial';
  }


  simularMeses(peticion: Peticion) {
    //ya tengo la semana liquidada en este componente 
    //la debo usar para calcular el mes 
    this.peticion = peticion;
    this.mes = this.liquidadorMesesService.simularAngo(this.semana, this.peticion);
    //ocultar todas las otras simulaciones y formularios
    this.mostrarMesSimulacion = true;
    this.mostrarSemanaSimulacion = false;
    this.mostrarInicialForm = false;
    this.mostrarMesForm = false;
    this.mostrarAgnoSimulacion = false;
    this.mostrarAgnoForm = true;
    this.volverAEtapa = 'semana';
    console.log("Volver a Etapa: ", this.volverAEtapa);
  }

  simularAgnos(peticion: Peticion) {
    console.log("Simular años WIP");
    this.peticion = peticion;
    this.mostrarMesSimulacion = false;
    this.mostrarSemanaSimulacion = false;
    this.mostrarInicialForm = false;
    this.mostrarMesForm = false;
    this.mostrarAgnoSimulacion = true;
    this.mostrarAgnoForm = false;
    this.volverAEtapa = 'mes';
    console.log("Volver a Etapa: ", this.volverAEtapa);
  }


  /**
   * Habilita componentes para simular una navegación 
   * @param paso 
   */
  navegarA(paso: string) {
    console.log("Volver A:", paso)
    switch (paso) {
      case 'parametros':
        this.mostrarParametros = true;
        this.mostrarInicialForm = false;
        this.mostrarMesForm = false;
        this.mostrarSemanaSimulacion = false;
        this.mostrarMesSimulacion = false;
        this.mostrarAgnoSimulacion = false;
        this.mostrarAgnoForm = false;
        this.volverAEtapa = '??';
        break;
      case 'inicial':
        this.mostrarParametros = false;
        this.mostrarInicialForm = true;
        this.mostrarMesForm = false;
        this.mostrarSemanaSimulacion = false;
        this.mostrarMesSimulacion = false;
        this.mostrarAgnoSimulacion = false;
        this.mostrarAgnoForm = false;
        this.volverAEtapa = '??';
        break;
      case 'semana':
        this.mostrarParametros = false;
        this.mostrarInicialForm = false;
        this.mostrarMesForm = true;
        this.mostrarSemanaSimulacion = true;
        this.mostrarMesSimulacion = false;
        this.mostrarAgnoSimulacion = false;
        this.mostrarAgnoForm = false;
        this.volverAEtapa = 'inicial';
        break;
      case 'mes':
        this.mostrarParametros = false;
        this.mostrarInicialForm = false;
        this.mostrarMesForm = false;
        this.mostrarSemanaSimulacion = false;
        this.mostrarMesSimulacion = true;
        this.mostrarAgnoSimulacion = false;
        this.mostrarAgnoForm = false;
        this.volverAEtapa = 'semana';
        break;
      case 'agno':
        this.mostrarParametros = false;
        this.mostrarInicialForm = true;
        this.mostrarMesForm = false;
        this.mostrarSemanaSimulacion = false;
        this.mostrarMesSimulacion = false;
        this.mostrarAgnoSimulacion = true;
        this.mostrarAgnoForm = true;
        this.volverAEtapa = 'semana';
        break;
    }
  }

}
