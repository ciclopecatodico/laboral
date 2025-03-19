import { Component, Input, Output, EventEmitter } from '@angular/core';
import { List } from '../../model/listas/list';


@Component({
  selector: 'time-picker',
  standalone: false,
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.css'
})
export class TimePickerComponent {

  public list = new List();
  public hour = '';
  public minute = '';
  public ampm = '';
  public showPanel = false;
  public fullHour = '';

  @Input() invalid = false; 

  @Output() setTime = new EventEmitter<string>();

  constructor() { }

  public setHour(val: any) {
    this.hour = val;
    this.setFullHour();
  }

  public setMinute(val: any) {
    this.minute = val;
    this.setFullHour();
  }

  public setAmpm(val: any) {
    this.ampm = val;
    this.setFullHour();
    this.showPanel = false;
  }

  public setFullHour(){
    this.fullHour = this.hour+':'+this.minute+' '+this.ampm;
    this.setTime.emit(this.fullHour);
  }

  @Input()
  set time(value: string) {
    //'08:00 AM'
    if (value) {
      let time = value.split(' ');
      this.ampm = time[1];
      time = time[0].split(':');
      this.hour = time[0];
      this.minute = time[1];
    } else {
      this.hour = '08';
      this.minute = '00';
      this.ampm = 'AM';
    }
  }

}
