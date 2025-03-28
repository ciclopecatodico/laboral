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
  public mostrarBotonVolver = false;
  public mostrarSemanaSimulacion = false;
  public mostrarMesForm = false;
  public mostrarMesSimulacion = false;

  public volverAEtapa = 'inicial'; //inicial|sena|
  public semana = Array<HorasSemana>();
  public mes = Array<ValorHoras>(); 
  //Se encarga de liquidar las horas de una semana 
  public liquidadorSemanaService: LiquidadorSemanaService;
  //Se encarga de liquidar un año, conjunto de 12 meses
  public liquidadorMesesService : LiquidadorMesesService;


  constructor(liquidadorSemanaService: LiquidadorSemanaService, liquidadorMesService : LiquidadorMesesService) {
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
    this.volverAEtapa = 'inicial';
    this.mostrarBotonVolver = true;
  }


  simularMeses(peticion: Peticion) {
    //ya tengo la semana liquidada en este componente 
    //la debo usar para calcular el mes 
    this.peticion = peticion;
    this.mes = this.liquidadorMesesService.simularAngo(this.semana,this.peticion);
    //ocultar todas las otras simulaciones y formularios
    this.mostrarMesSimulacion = true;
    this.mostrarSemanaSimulacion = false;
    this.mostrarInicialForm = false; 
    this.mostrarMesForm = false;
    this.volverAEtapa = 'semana';
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
        this.volverAEtapa = '??';
        this.mostrarBotonVolver = false;
        break;
      case 'inicial':
        this.mostrarParametros = false; 
        this.mostrarInicialForm = true;
        this.mostrarMesForm = false; 
        this.mostrarSemanaSimulacion = false;
        this.mostrarMesSimulacion = false;
        this.volverAEtapa = '??';
        this.mostrarBotonVolver = false;
        break;
      case 'semana':
        this.mostrarParametros = false; 
        this.mostrarInicialForm = false;
        this.mostrarMesForm = true; 
        this.mostrarSemanaSimulacion = true;
        this.mostrarMesSimulacion = false;
        this.volverAEtapa = 'inicial';
        this.mostrarBotonVolver = true;
        break;
      case 'mes':
        this.mostrarParametros = false; 
        this.mostrarInicialForm = true;
        this.mostrarMesForm = false; 
        this.mostrarSemanaSimulacion = false;
        this.mostrarMesSimulacion = false;
        this.volverAEtapa = 'semana';
        this.mostrarBotonVolver = true;
        break;
    }
  }

}
