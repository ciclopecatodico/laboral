import { Component, OnInit } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { Agno } from '../../../model/simulacion/agno/ango';
import { SimuladorService } from '../../../service/simulacion/simulador.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../service/storage/storage.service';

@Component({
  selector: 'app-paso-3',
  standalone: false,
  templateUrl: './paso-3.component.html',
  styleUrl: './paso-3.component.css'
})
export class Paso3Component implements OnInit {

  public simuladorService:SimuladorService;
  private storageService: StorageService;
  public peticion = Object.create(Peticion);
  public agno = Object.create(Agno);
  private router: Router;

  constructor(storageService: StorageService,simuladorService:SimuladorService, router: Router){
    this.storageService = storageService;
    this.simuladorService = simuladorService;
    this.router = router;
  }

  
  simularLaboral(peticion: Peticion){
    this.simuladorService.simularLaboral(peticion);
    this.router.navigate(['/paso-4']);
  }

  ngOnInit(): void {
    this.agno = this.storageService.retrieve('agno');
    this.peticion = this.storageService.retrieve('peticion');
  }

}
