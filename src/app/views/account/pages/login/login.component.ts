import { Component, OnInit, Injectable, OnDestroy, Injector } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AbstractLogin } from 'src/app/core/models/abstracts/abstract-login/abstract-login';

const CLASSBODY = 'account_login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AbstractLogin implements OnInit, OnDestroy {
  public user: FormGroup;
  public recover: FormGroup;
  private view: boolean;
  public tooltipHelp = false;
  public mailDocument = '';
  public petitionLogin = false;
  public petitionRecover = false;
  public isSendMail = false;
  public image = 'assets/images/thumbnail.jpg';
  public locked = false;
  public flipcard = false;
  public frontErrorMessage;
  public idErrorMessage = '';

  private errorMessage = {
    NOT_FOUND: ['No encontrado', 'not_found'],
    BAD_REQUEST: ['Solicitud incorrecta', 'bad_request'],
    DOCUMENT_OR_MAIL_ERROR: ['Documento o correo electrónico inválido', 'docu_mail_error'],
    BAD_CREDENTIALS: ['Usuario/correo o contraseña inválido', 'bad_credentials'],
    USER_NOT_EXIST: ['El usuario no existe', 'not_exists'],
    USER_INACTIVE: ['El usuario no se encuentra activo', 'user_inactive'],
    USER_IS_LOCK: ['Usuario se encuentra bloqueado, por alcanzar el límite de intentos fallidos, por favor ingresar a la opción ¿Olvidaste tu contraseña?', 'user_lock'],
    USER_CURRENT: ['El usuario actual no se puede eliminar o cambiar su estado', 'not_can_change_user'],
  };

  constructor(injector: Injector, private domSanitizer: DomSanitizer) {
    super(injector);
  }

  ngOnInit() {
    document.body.classList.add(CLASSBODY);

    this.isSendMail = false;

    this.user = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.recover = new FormGroup({
      mailOrDocument: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy() {
    document.body.classList.remove(CLASSBODY);
  }

  public login(): void {
    this.locked = false;
    this.api.post('/users/login', this.user.value).then((result: any) => {
      if (result && result.token) {
        this.acceptLogin(result.token, result.refreshToken);
      }
    },
      error => {
        const responseError = this.errorMessage[error.error.Message][0];
        this.frontErrorMessage = (responseError !== undefined) ? responseError : 'Error desconocido ' + error.error.Message;
        this.idErrorMessage = (responseError !== undefined) ? this.errorMessage[error.error.Message][1] : '';

        if (error.error.Message === 'BAD_CREDENTIALS') {
          this.petitionLogin = true;
          this.locked = false;
        } else {
          this.petitionLogin = false;
          this.locked = true;
        }
      }
    );
  }
  public recoverForm(): void {
    this.api.post('/Users/RecoveryPassword', this.recover.value).then((result: any) => {
      this.mailDocument = result.email;
      this.isSendMail = true;
    },
      error => {
        this.frontErrorMessage = this.errorMessage[error.error.Message][0];
        this.idErrorMessage = this.errorMessage[error.error.Message][1];
        this.petitionRecover = true;
        this.mailDocument = '';
        this.isSendMail = false;
      }
    );

  }

  public animateForm() {
    this.flipcard = !this.flipcard;

    this.mailDocument = '';
    this.isSendMail = false;
    this.petitionRecover = false;
    this.petitionLogin = false;
    this.locked = false;
    this.recover.get('mailOrDocument').setValue('');
  }

  public viewToolTip() {
    this.tooltipHelp = true;
  }

  public noViewToolTip() {
    this.tooltipHelp = false;
  }

  private addToggleClassElement(id: string, classT: string) {
    const element = document.getElementById(id);
    element.classList.toggle(classT);
  }
}
