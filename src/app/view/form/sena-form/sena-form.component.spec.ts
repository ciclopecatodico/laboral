import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenaFormComponent } from './sena-form.component';

describe('SenaFormComponent', () => {
  let component: SenaFormComponent;
  let fixture: ComponentFixture<SenaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SenaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
