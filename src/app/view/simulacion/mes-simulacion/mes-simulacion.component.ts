import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { ConfigurationService } from '../../../service/configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';
import { Mes } from '../../../model/simulacion/mes/mes';
import { MesModel } from '../../../model/modelos-simulacion/mes-model/mes-model';
import { LiquidadorMesService } from '../../../service/liquidador/liquidador-mes/liquidador-mes.service';
import { StorageService } from '../../../service/storage/storage.service';
import { Semana } from '../../../model/simulacion/semana/semana';

@Component({
  selector: 'mes-simulacion',
  standalone: false,
  templateUrl: './mes-simulacion.component.html',
  styleUrl: './mes-simulacion.component.css'
})
export class MesSimulacionComponent implements OnInit {

  @Input()
  public mes: Mes;

  @Output()
  public peticionMesChange = new EventEmitter<Peticion>;

  private liquidadorMesService: LiquidadorMesService;
  private storageService: StorageService;

  public peticion_: Peticion;
  public parametros: Parametros[];
  public verNotas = false;
  public const = CONST;
  public meses: MesModel[];
  public semana: Semana;
  public excluir = 'marzo'

  constructor(configurationService: ConfigurationService, liquidadorMesService: LiquidadorMesService, storageService: StorageService) {
    this.parametros = configurationService.parametros;
    this.meses = configurationService.agnoModel.meses;
    this.liquidadorMesService = liquidadorMesService;
    this.storageService = storageService;
    this.peticion_ = Object.create(Peticion);
    this.mes = Object.create(Mes);
    this.semana = Object.create(Semana);
  }


  ngOnInit(): void {
    this.semana = this.storageService.retrieve('semana');
    //this.peticion_ = this.storageService.retrieve('peticion');
  }

  public simularMes() {
    console.log("petición:", JSON.stringify(this.peticion_));
    this.mes = this.liquidadorMesService.simularMes(this.semana.horasSemana, this.peticion_);
    let mesSelected = this.meses.find(m => m.id == this.peticion_.mesId);
    if (mesSelected) {
      this.excluir = mesSelected.nombre;
    }
    console.log("Excluir:", this.excluir);
  }

  @Input()
  set peticion(peticion: Peticion) {
    this.peticion_ = peticion;
  }

  get peticion() {
    return this.peticion_;
  }


}
