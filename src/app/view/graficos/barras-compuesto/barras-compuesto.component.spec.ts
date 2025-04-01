import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarrasCompuestoComponent } from './barras-compuesto.component';


describe('BarrasCompuestoComponent', () => {
  let component: BarrasCompuestoComponent;
  let fixture: ComponentFixture<BarrasCompuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarrasCompuestoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarrasCompuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
