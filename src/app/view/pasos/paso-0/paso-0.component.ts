import { Component } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { SimuladorService } from '../../../service/simulacion/simulador.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../service/storage/storage.service';

@Component({
  selector: 'app-paso-0',
  standalone: false,
  templateUrl: './paso-0.component.html',
  styleUrl: './paso-0.component.css'
})
export class Paso0Component {

  public peticion: Peticion;
  public simuladorService: SimuladorService;
  private storageService: StorageService;
  private router: Router;

  constructor(simuladorService: SimuladorService, storageService: StorageService, router: Router) {
    this.router = router;
    this.storageService = storageService; 
    this.simuladorService = simuladorService;
    this.peticion = Object.create(Peticion);
  }

  simularSemana(peticion: Peticion) {
    this.simuladorService.simularSemana(peticion);
    this.storageService.save('peticion', this.peticion);
    this.router.navigate(['/paso-1']);
  }
}
