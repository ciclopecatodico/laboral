import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesFormComponent } from './mes-form.component';

describe('SenaFormComponent', () => {
  let component: MesFormComponent;
  let fixture: ComponentFixture<MesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
