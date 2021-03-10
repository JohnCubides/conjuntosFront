import { ApiService } from './../../../../core/https/http.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePasswordComponent } from './restore-password.component';
import { SharedsModule } from 'src/app/shareds/shareds.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

describe('RestorePasswordComponent', () => {
  let component: RestorePasswordComponent;
  let fixture: ComponentFixture<RestorePasswordComponent>;
  let apiServiceMock;
  let spyPostApiService;
  const constantResponse = {
    SUCCES_RESTORE: 'La contraseña fue restablecida correctamente',
    REQUEST_INVALID_OR_EXPIRED: 'La solicitud de restablecer contraseña es inválida o expiró.',
    USER_NOT_EXIST: 'El usuario no existe.'
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RestorePasswordComponent],
      imports: [
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SharedsModule
      ],
      providers: [ApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordComponent);
    component = fixture.componentInstance;
    apiServiceMock = TestBed.inject(ApiService);
    spyPostApiService = spyOn(apiServiceMock, 'post');
  });

  describe('Charge Page', () => {
    it('should create', () => {
      spyPostApiService.and.returnValue(Promise.resolve());
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    /*it('should not charge page with REQUEST_INVALID_OR_EXPIRED', (done) => {
      spyPostApiService.and.returnValue(Promise.reject({ error: 'REQUEST_INVALID_OR_EXPIRED' }));
      fixture.detectChanges();
      spyPostApiService.calls.mostRecent().returnValue.catch(() => {
        fixture.detectChanges();
        expect(constantResponse.REQUEST_INVALID_OR_EXPIRED).toEqual(component.message);
        done();
      });
    });*/
  });

  describe('reset Password', () => {

    beforeEach(() => {
      spyPostApiService.and.returnValue(Promise.resolve());
      fixture.detectChanges();
    });

    it('should reset password', (done) => {
      spyPostApiService.and.returnValue(Promise.resolve());
      component.restore();
      spyPostApiService.calls.mostRecent().returnValue.then(() => {
        fixture.detectChanges();
        expect(constantResponse.SUCCES_RESTORE).toEqual(component.message);
        done();
      });
    });

    /*it('should not reset password and return error USER_NOT_EXIST', (done) => {
      spyPostApiService.and.returnValue(Promise.reject({ error: 'USER_NOT_EXIST' }));
      component.restore();
      spyPostApiService.calls.mostRecent().returnValue.catch(() => {
        fixture.detectChanges();
        expect(constantResponse.USER_NOT_EXIST).toEqual(component.message);
        done();
      });
    });*/
  });

});
