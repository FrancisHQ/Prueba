import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionComponent } from './sesion.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';

describe('SesionComponent', () => {
  let component: SesionComponent;
  let fixture: ComponentFixture<SesionComponent>;

  beforeEach(async () => {
    // await TestBed.configureTestingModule({
    //   declarations: [ SesionComponent ],
    //   imports: [ ReactiveFormsModule, RouterTestingModule, RouterModule ],
    //   providers: [ FormBuilder, AuthenticationService ]
    // })
    // .compileComponents();

    fixture = TestBed.createComponent(SesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
