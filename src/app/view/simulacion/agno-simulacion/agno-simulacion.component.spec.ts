import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgnoSimulacionComponent } from './agno-simulacion.component';

describe('AgnoSimulacionComponent', () => {
  let component: AgnoSimulacionComponent;
  let fixture: ComponentFixture<AgnoSimulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgnoSimulacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgnoSimulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
