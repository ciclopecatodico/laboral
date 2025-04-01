import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrasSimpleComponent } from './barras-simple.component';

describe('BarrasComponent', () => {
  let component: BarrasSimpleComponent;
  let fixture: ComponentFixture<BarrasSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarrasSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarrasSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
