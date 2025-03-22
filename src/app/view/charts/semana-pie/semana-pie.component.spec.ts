import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanaPieComponent } from './semana-pie.component';

describe('SemanaPieComponent', () => {
  let component: SemanaPieComponent;
  let fixture: ComponentFixture<SemanaPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SemanaPieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemanaPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
