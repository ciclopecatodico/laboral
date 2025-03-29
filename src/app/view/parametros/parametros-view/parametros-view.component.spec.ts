import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosViewComponent } from './parametros-view.component';

describe('ParametrosViewComponent', () => {
  let component: ParametrosViewComponent;
  let fixture: ComponentFixture<ParametrosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParametrosViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
