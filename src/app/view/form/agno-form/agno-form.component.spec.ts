import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgnoFormComponent } from './agno-form.component';

describe('AgnoFormComponent', () => {
  let component: AgnoFormComponent;
  let fixture: ComponentFixture<AgnoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgnoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgnoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
