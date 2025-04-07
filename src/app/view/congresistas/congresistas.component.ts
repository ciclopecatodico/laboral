import { Component, OnDestroy, OnInit } from '@angular/core';
import { Config } from '../../model/config/config';
import { ConfigurationService } from '../../service/configuration/configuration.service';
import { CONST } from '../../model/const/CONST';

@Component({
  selector: 'app-congresistas',
  standalone: false,
  templateUrl: './congresistas.component.html',
  styleUrl: './congresistas.component.css'
})
export class CongresistasComponent implements OnInit, OnDestroy {

  public congresistas: Config[];

  public path = CONST.congresistasFolder; 


  constructor(configurationService: ConfigurationService) {
    this.congresistas = configurationService.congresistas;
  }

  currentImageIndex: number = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startImageSlider();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startImageSlider(): void {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.congresistas.length;
    }, CONST.congresistasTime); // Change image every 3 seconds
  }

}
