import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicialFormComponent } from './inicial-form.component';



describe('InicialFormComponent', () => {
  let component: InicialFormComponent;
  let fixture: ComponentFixture<InicialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicialFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
