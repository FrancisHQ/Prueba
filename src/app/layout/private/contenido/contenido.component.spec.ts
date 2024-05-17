import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContenidoComponent } from './contenido.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContenidoComponent', () => {
  let component: ContenidoComponent;
  let fixture: ComponentFixture<ContenidoComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ContenidoComponent],
  //     imports: [ RouterTestingModule ]
  //   })
  //   .compileComponents();
  // });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
