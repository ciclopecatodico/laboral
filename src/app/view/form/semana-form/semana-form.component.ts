import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { ConfigurationService } from '../../../service/configuration/configuration.service';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { CONST } from '../../../model/const/CONST';
import { Router } from '@angular/router';

@Component({
  selector: 'semana-form',
  standalone: false,
  templateUrl: './semana-form.component.html',
  styleUrl: './semana-form.component.css'
})
export class SemanaFormComponent {

  @Output()
  public semanaChange = new EventEmitter<Peticion>;

  private router : Router;
  public peticion_: Peticion;
  public parametros: Parametros;

  constructor(configurationService: ConfigurationService, router: Router){
    this.router = router; 
    this.peticion_ = new Peticion('', 1);
    this.parametros = configurationService.parametros[CONST.reforma2025.index];
  }

  public calcularMes() {
    this.semanaChange.emit(this.peticion_);
  }

  public volver(){
    this.router.navigate(['paso-0']);
}
}
