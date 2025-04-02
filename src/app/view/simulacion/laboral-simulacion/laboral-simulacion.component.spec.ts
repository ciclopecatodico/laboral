import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboralSimulacionComponent } from './laboral-simulacion.component';

describe('LaboralSimulacionComponent', () => {
  let component: LaboralSimulacionComponent;
  let fixture: ComponentFixture<LaboralSimulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaboralSimulacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboralSimulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
