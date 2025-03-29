import { Component } from '@angular/core';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { ConfigurationService } from '../../../service/configuration/configuration.service';
import { Credito } from '../../../model/credito/credito';
import { CONST } from '../../../model/const/CONST';

@Component({
  selector: 'parametros-view',
  standalone: false,
  templateUrl: './parametros-view.component.html',
  styleUrl: './parametros-view.component.css'
})
export class ParametrosViewComponent {


  public parametros: Parametros[]
  public configurationService: ConfigurationService;
  public contacto: Credito;
  public const = CONST;


  constructor(configurationService: ConfigurationService) {
    this.configurationService = configurationService;
    this.parametros = configurationService.parametros;
    this.contacto = configurationService.creditos[0];
  }

}
