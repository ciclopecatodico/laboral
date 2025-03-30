import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasAgnoComponent } from './horas-agno.component';

describe('HorasMesComponent', () => {
  let component: HorasAgnoComponent;
  let fixture: ComponentFixture<HorasAgnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorasAgnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorasAgnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
