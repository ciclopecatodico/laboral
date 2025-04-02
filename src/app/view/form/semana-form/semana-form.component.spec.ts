import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanaFormComponent } from './semana-form.component';

describe('SemanaFormComponent', () => {
  let component: SemanaFormComponent;
  let fixture: ComponentFixture<SemanaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SemanaFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SemanaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
