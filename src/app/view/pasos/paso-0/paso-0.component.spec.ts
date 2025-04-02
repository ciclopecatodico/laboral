import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paso0Component } from './paso-0.component';

describe('Paso0Component', () => {
  let component: Paso0Component;
  let fixture: ComponentFixture<Paso0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Paso0Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paso0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
