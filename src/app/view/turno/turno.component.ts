import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { List } from '../../model/listas/list';
import { SelectItem } from '../../model/selectItem/SelectItem';
import moment, { duration } from 'moment';
import { Turno } from '../../model/turno/turno';

@Component({
  selector: 'app-turno',
  standalone: false,
  templateUrl: './turno.component.html',
  styleUrl: './turno.component.css'
})
export class TurnoComponent implements OnInit {

  private turno_ : Turno;
  public lista = new List();
  public horas = '05:00';
  public horasTurno = '00:00';
  public days: SelectItem[] = new Array<SelectItem>();
  public invalidFin = false;

  @Output()
  turnoChange = new EventEmitter<Turno>();
  
  @Output()
  deleteEmitter = new EventEmitter<number>();

  constructor(){
    this.turno_ = new Turno(1, 'Turno 1', '08:00 AM', '12:00PM');
  }

  ngOnInit(): void {
    if(this.turno){
      
    }
  }

  public setHoraInicio(time: string) {
    this.turno_.inicio = time;
    this.setHoraFin(time);
    this.turnoChange.emit(this.turno_);
  }

  public setHoraFin(time: string) {
    this.turno_.fin = time; 
    let fin = moment(time, 'hh:mm a');
    let inicio = moment(this.turno_.inicio, 'hh:mm a');
    if (fin.isBefore(inicio)) {
      console.log("isBefore!!");
      this.invalidFin = true;
    } else {
      this.invalidFin = false;
      let hours = inicio.format('HH:mm:ss');
      let duration = moment.duration(hours);
      fin.subtract(duration);
      this.horas = fin.format('HH:mm');
    }
    this.turno_.fin = time;
    this.turnoChange.emit(this.turno_);
  }

  public setDays(days: SelectItem[]) {
    this.days = days;
    this.calcularHorasTurno();
  }

  public calcularHorasTurno() {
    this.turno_.dias = [];
    if (this.horas) {
      let baseMm = 0
      let minutosTurno = moment.duration(this.horas).asMinutes();
      this.days.forEach(d => {
        if (d.selected) {
          baseMm = baseMm + minutosTurno;
          if (d.id) {
            this.turno_.dias?.push(d.id);
          }
        }
      })
      const duration = moment.duration(baseMm, 'minutes');
      this.horasTurno = duration.asHours()+'';
    }
    this.turnoChange.emit(this.turno_);
  }

  eliminarTurno(id: number) {
    this.deleteEmitter.emit(id);
  }

  @Input()
  set turno(turno:Turno) {
    this.turno_ = turno;
  }

  get turno(){
    return this.turno_;
  }
}
