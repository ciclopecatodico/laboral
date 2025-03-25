import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanaSimulacionComponent } from './semana-simulacion.component';

describe('SimulacionComponent', () => {
  let component: SemanaSimulacionComponent;
  let fixture: ComponentFixture<SemanaSimulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SemanaSimulacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemanaSimulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
