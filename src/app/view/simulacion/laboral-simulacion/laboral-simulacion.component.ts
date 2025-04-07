import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { Laboral } from '../../../model/simulacion/laboral/laboral';
import { CONST } from '../../../model/const/CONST';
import { Router } from '@angular/router';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { ConfigurationService } from '../../../service/configuration/configuration.service';

@Component({
  selector: 'laboral-simulacion',
  standalone: false,
  templateUrl: './laboral-simulacion.component.html',
  styleUrl: './laboral-simulacion.component.css'
})
export class LaboralSimulacionComponent {

  @Output()
  public peticionMesChange = new EventEmitter<Peticion>;
  public peticion_: Peticion;
  public verNotas = false;
  public const = CONST;
  public agnosTrabajando = 0;
  public valorAgno = 0;
  public valorMes = 0;
  public valorDia = 0;

  public politicoMes = 0;
  public politicoDia = 0;
  public politicoHora = 0;

  public parametros: Parametros[];
  private router: Router;

  @Input()
  public laboral_ = new Laboral(0, 0, 0, []);

  constructor(router: Router, configruationService: ConfigurationService) {
    this.router = router;
    this.parametros = configruationService.parametros; 
    this.peticion_ = Object.create(Peticion);
  }


  private comparar() {
    this.agnosTrabajando = this.laboral.fin - this.const.agnoActual;
    if (this.laboral_.diferencia && this.laboral_.diferencia > 0) {
      this.valorAgno = this.laboral_.diferencia / this.agnosTrabajando;
      this.valorMes = this.laboral_.diferencia / (this.agnosTrabajando * 12);
      this.valorDia = this.laboral_.diferencia / (this.agnosTrabajando * 12 * 30 );
   
       //politico dias:
      this.politicoMes = this.laboral_.diferencia / this.const.salarioCongresista;
      this.politicoDia = this.laboral_.diferencia / (this.const.salarioCongresista/30);
 
    }
  }

  @Input()
  set laboral(laboral: Laboral) {
    this.laboral_ = laboral;
    this.comparar();
  }

  get laboral() {
    return this.laboral_;
  }

  @Input()
  set peticion(peticion: Peticion) {
    this.peticion_ = peticion;

  }

  get peticion() {
    return this.peticion_;
  }

  get verAgno() {
    return JSON.stringify(this.laboral);
  }

  public volver() {
    this.router.navigate(['paso-3']);
  }
}
