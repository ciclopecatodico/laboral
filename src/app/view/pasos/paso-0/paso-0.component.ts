import { Component } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { SimuladorService } from '../../../service/simulacion/simulador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paso-0',
  standalone: false,
  templateUrl: './paso-0.component.html',
  styleUrl: './paso-0.component.css'
})
export class Paso0Component {


    public peticion = Object.create(Peticion);
    public simuladorService : SimuladorService;
    private router : Router;

    constructor(simuladorService:SimuladorService, router: Router){
      this.router = router; 
      this.simuladorService = simuladorService;
    }

    simularSemana(peticion: Peticion){
      console.log("simularSemana->",JSON.stringify(peticion));
      this.simuladorService.simularSemana(peticion);
      this.router.navigate(['/paso-1']);
    }
}
