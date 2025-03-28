import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { TurnoComponent } from './view/turno/turno.component';
import { DayPickerComponent } from './view/day-picker/day-picker.component';
import { HorasSemanaComponent } from './view/horas/horas-semana/horas-semana.component';
import { SemanaSimulacionComponent } from './view/simulacion/semana-simulacion/semana-simulacion.component';
import { HorasMesComponent } from './view/horas/horas-mes/horas-mes.component';

import { InicialFormComponent } from './view/form/inicial-form/inicial-form.component';
import { MesFormComponent } from './view/form/mes-form/mes-form.component';

import { MesSimulacionComponent } from './view/simulacion/mes-simulacion/mes-simulacion.component';
import { AgnoSimulacionComponent } from './view/simulacion/agno-simulacion/agno-simulacion.component';
import { CreditsComponent } from './view/credits/credits.component';
import { AgnoFormComponent } from './view/form/agno-form/agno-form.component';
import { NavegacionComponent } from './view/navegacion/navegacion.component';

@NgModule({
  declarations: [
    AppComponent,
    InicialFormComponent,
    TurnoComponent,
    DayPickerComponent,
    HorasSemanaComponent,
    SemanaSimulacionComponent,
    HorasMesComponent,
    MesFormComponent,
    NavegacionComponent,
    MesSimulacionComponent,
    AgnoSimulacionComponent,
    CreditsComponent,
    AgnoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
