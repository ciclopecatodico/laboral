import { Component, Input } from '@angular/core';
import { CONST } from '../../../model/const/CONST';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { ConfigurationService } from '../../../service/configuration/configuration.service';
import { Peticion } from '../../../model/peticion/peticion.model';

@Component({
  selector: 'app-parametros',
  standalone: false,
  templateUrl: './parametros.component.html',
  styleUrl: './parametros.component.css'
})
export class ParametrosComponent {

  public const = CONST;
  public parametros: Parametros[];
  private peticion_: Peticion;
  public salarioHora = [0, 0, 0, 0];

  public verSMLV = true;

  constructor(configurationService: ConfigurationService) {
    this.parametros = configurationService.parametros;
    this.peticion = Object.create(Peticion);
    this.peticion_ = Object.create(Peticion);
  }

  @Input()
  set peticion(peticion: Peticion) {
    this.peticion_ = peticion;
    this.verSMLV = true;
    this.recalcularParametros();
  }

  get peticion(): Peticion {
    return this.peticion_;
  }

  private recalcularParametros() {
    //Si viene un salario mayor al SMLV recalculo el valor de las horas:
    if (this.peticion_.salario > this.parametros[0].smlv) {
      this.liquidarSalarioHora(this.peticion_.salario);
      this.verSMLV = false;
    } else {
      if (this.peticion_.sena == true) { //caso especial liquidar salario sena 
        if (this.peticion_.etapa === CONST.senaLectiva.id) {
          this.liquidarSalarioHoraLectiva();
        } else {
          this.liquidarSalarioHoraProductiva();
        }
      } else {
        this.liquidarSalarioHora(this.parametros[0].smlv);
      }
      this.verSMLV = true;
    }

  }

  private liquidarSalarioHoraLectiva() {
    this.parametros.forEach(p => {
      let salario = (p.smlv * p.senaLectiva) / 100
      let hora = this.round(salario / p.jornadaLaboralMensual);
      this.salarioHora[p.reformaIndex] = hora;
    });
  }

  private liquidarSalarioHoraProductiva() {
    this.parametros.forEach(p => {
      let salario = (p.smlv * p.senaProductiva) / 100
      let hora = this.round(salario / p.jornadaLaboralMensual);
      this.salarioHora[p.reformaIndex] = hora;
    });
  }

  private liquidarSalarioHora(salario: number) {
    this.parametros.forEach(p => {
      let hora = this.round(salario / p.jornadaLaboralMensual);
      this.salarioHora[p.reformaIndex] = hora;
    });
  }


  private round(data: number) {
    return Math.round(data * 10) / 10;
  }
}
