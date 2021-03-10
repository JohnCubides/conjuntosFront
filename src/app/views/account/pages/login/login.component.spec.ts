import { ApiService } from './../../../../core/https/http.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let apiServiceMock: ApiService;
  let spyPostApiService;
  const mockResponseLogin = { token: 'asdsdsadsadsdasdsd' };
  const errorMessage = {
    NOT_FOUND: 'No encontrado',
    BAD_REQUEST: 'Solicitud incorrecta',
    DOCUMENT_OR_MAIL_ERROR: 'Documento o correo electrónico inválido',
    BAD_CREDENTIALS: 'Usuario/correo o contraseña inválido',
    USER_NOT_EXIST: 'Usuario no existe',
    USER_IS_LOCK: 'Usuario se encuentra bloqueado, por alcanzar el límite de intentos fallidos, por favor ingresar a la opción ¿Olvidaste tu contraseña?',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [{path: 'setting/rol/admin', component: LoginComponent}]
        ),
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        ApiService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    fixture = TestBed.createComponent(LoginComponent);
    apiServiceMock = TestBed.inject(ApiService);
    spyPostApiService = spyOn(apiServiceMock, 'post');
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  describe('LoginUser', () => {

    it('should login user', (done) => {
      fixture.ngZone.run(() => {
        const key = 'token';
        spyPostApiService.and.returnValue(Promise.resolve(mockResponseLogin));
        component.login();
        spyPostApiService.calls.mostRecent().returnValue.then(() => {
          fixture.detectChanges();
          expect(localStorage.getItem(key)).toEqual(mockResponseLogin.token);
          done();
        });
      });
    });

    /*it('should not login user and response error BAD_CREDENTIALS', (done) => {
      spyPostApiService.and.returnValue(Promise.reject({ error: 'BAD_CREDENTIALS' }));
      component.login();
      spyPostApiService.calls.mostRecent().returnValue.catch(() => {
        fixture.detectChanges();
        expect(component.frontErrorMessage).toEqual(errorMessage.BAD_CREDENTIALS);
        done();
      });
    });*/

  });

  /*describe('recoveryPassword', () => {

    it('should recovery password', (done) => {
      spyPostApiService.and.returnValue(Promise.resolve());
      component.recoverForm();
      spyPostApiService.calls.mostRecent().returnValue.then(() => {
        fixture.detectChanges();
        expect(true).toEqual(component.isSendMail);
        done();
      });
    });

    it('should not recovery password and return message DOCUMENT_OR_MAIL_ERROR', (done) => {
      spyPostApiService.and.returnValue(Promise.reject({ error: 'DOCUMENT_OR_MAIL_ERROR' }));
      component.recoverForm();
      spyPostApiService.calls.mostRecent().returnValue.catch(() => {
        fixture.detectChanges();
        expect(component.frontErrorMessage).toEqual(errorMessage.DOCUMENT_OR_MAIL_ERROR);
        done();
      });
    });
  });*/
});
