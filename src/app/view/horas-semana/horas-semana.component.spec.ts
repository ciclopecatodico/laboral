import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasSemanaComponent } from './horas-semana.component';

describe('HorasSemanaComponent', () => {
  let component: HorasSemanaComponent;
  let fixture: ComponentFixture<HorasSemanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorasSemanaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorasSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
