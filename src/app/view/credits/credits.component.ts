import { Component } from '@angular/core';
import { Credito } from '../../model/credito/credito';
import { ConfigurationService } from '../../service/configuration/configuration.service';

@Component({
  selector: 'app-credits',
  standalone: false,
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.css'
})
export class CreditsComponent {

  public credits : Array<Credito>;

  constructor(configuration: ConfigurationService){
    this.credits = configuration.creditos;
  }

}
