import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './view/form/form.component';
import { FormsModule } from '@angular/forms';
import { TurnoComponent } from './view/turno/turno.component';
import { TimePickerComponent } from './view/time-picker/time-picker.component';
import { DayPickerComponent } from './view/day-picker/day-picker.component';
import { HorasSemanaComponent } from './view/horas-semana/horas-semana.component';
import { SimulacionComponent } from './view/simulacion/simulacion.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TurnoComponent,
    TimePickerComponent,
    DayPickerComponent,
    HorasSemanaComponent,
    SimulacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
