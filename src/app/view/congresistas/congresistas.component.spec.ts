import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongresistasComponent } from './congresistas.component';

describe('CongresistasComponent', () => {
  let component: CongresistasComponent;
  let fixture: ComponentFixture<CongresistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CongresistasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongresistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
