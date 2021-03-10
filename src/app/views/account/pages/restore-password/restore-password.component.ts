import { Component, OnInit, Injector } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, PatternValidator, ValidatorFn } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'src/app/core/https/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalNotification } from 'src/app/core/models/modal-notification/modal-notification';
import { ModalService } from 'src/app/core/services/modal.service';

const CLASSBODY = 'account_restore';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

  private view: boolean;
  public recover: FormGroup;
  public image = 'assets/images/thumbnail.jpg';
  private restorePassword: { password: string, token: string };
  public iscorrect = true;
  public successfull = false;
  public message: string;
  public messageRule = 'La contraseña no cumple con las reglas.';

  constructor(injector: Injector,
              private domSanitizer: DomSanitizer, private router: Router, private api: ApiService,
              private _MODAL: ModalService, private route: ActivatedRoute) {

    this.restorePassword = { token: '', password: '' };

    this.recover = new FormGroup({
      password: new FormControl(null, [Validators.required,
                                       Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{6,12}$'),
                                       this.specialCharacters()]),
      confirmPassword: new FormControl(null, [Validators.required,
                                              Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{6,12}$')])
    }, {
      validators: this.checkPasswords
    });

    this.restorePassword.token = this.route.snapshot.paramMap.get('token');
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword || confirmPassword === null ? null : { notSame: true };
  }

  specialCharacters(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
            const regex = /^([a-zA-Z0-9]+)$/;

            if (control.value !== undefined && !regex.test(control.value)) {
              return { specialCharacters: true };
            }
            return { specialCharacters:  control.value === undefined };
      };
  }

  ngOnInit() {
    document.body.classList.add(CLASSBODY);

    this.api.post('/Users/RestorePassword', this.restorePassword).then((result: any) => {},
      result => {
        this.resultSendUser(result.error);
      }
    );
   }

  public restore(): void {
    this.restorePassword.password = this.recover.get('password').value;
    this.api.post('/Users/RestorePassword', this.restorePassword).then((result: any) => {

      this.message = 'La contraseña fue restablecida correctamente';
      this.successfull = true;

    },
      resultError => {
        this.resultSendUser(resultError.error);
      }
    );
  }

  public finish(): void {
   this.router.navigateByUrl('/account/login');
  }


  private resultSendUser(errorMessage: any) {

    switch (errorMessage.Message) {
      case 'REQUEST_INVALID_OR_EXPIRED':
        this.message = 'La solicitud de restablecer contraseña es inválida o expiró.';
        break;
      case 'USER_NOT_EXIST':
        this.message = 'El usuario no existe.';
        break;
      case 'USER_INACTIVE':
        this.message = 'El usuario no se encuentra activo.';
        break;
      default:
        this.message = 'El proceso no se terminó satisfactoriamente. Intente nuevamente en unos segundos.';
        break;
    }
    this.successfull = false;
  }
}
