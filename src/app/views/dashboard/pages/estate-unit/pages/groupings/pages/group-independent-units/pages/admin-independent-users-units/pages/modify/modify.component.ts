import { Component, OnInit, Injector } from '@angular/core';
import { ApiService } from 'src/app/core/https/http.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssociatedUser } from 'src/app/core/models/associated-user/associated-user';
import { ModalNotification } from 'src/app/core/models/modal-notification/modal-notification';
import { Subject } from 'rxjs';
import { AbstractModal } from 'src/app/core/models/abstracts/abstract-modal/abstract-modal';
import { TableItem } from 'src/app/core/models/table-item/table-item';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent extends AbstractModal implements OnInit {
  public header = 'Modificar persona asociada';
  public form: any;
  public user: AssociatedUser;
  public buttonName = 'SAVE';
  public modal: ModalNotification = {
    idModal: 'modalUpdateUser',
    header: '',
    showFooter: false
  };
  public successful = false;
  public subject: Subject<boolean>;

  constructor(injector: Injector, public api: ApiService, private route: ActivatedRoute, public router: Router) {
    super(injector);
   }

  ngOnInit(): void {
    this.api.get(`/AssociatedUserIndependentUnit/${this.route.snapshot.paramMap.get('id')}`).then((result: any) => { 
      this.user = result as AssociatedUser;
    });
  }
  permitirSalirDeRuta() {
    if (this.form) {
      let validate = this.form.submitted || !this.form.dirty;
      if (!validate) {
        const subject = new Subject<boolean>();
        this.showValidate('Salir de modificar unidad inmobiliaria', '¿Está seguro de que desea salir de la página modificar unidad inmobiliaria?', 'warning');
        this.subject = subject;
        return subject.asObservable();
      }
    }
    return true;
  }
  formUser(form) {
    this.form = form;
  }
  public updatePeople(event: any): void {
    const unit = Object.assign({}, event);
    this.api.put(`/AssociatedUserIndependentUnit/${this.route.snapshot.paramMap.get('id')}`, unit).then(() => {
       this.showModal('Modificar usuario', 'Usuario actualizado exitosamente.', 'success');
    },
      (resultError) => {
        this.resultSendUser(resultError.error);
      });
  }
  public showModal(header: string, message: string, actionModal: any) {
    this.modal.btnClose = undefined;
    this.modal.header = header;
    this.modal.message = message;
    this.modal.showFooter = true;
    this.modal.buttonsFooter = [
      {
        id: 'btnErrorClose',
        text: 'Cerrar',
        class: 'btnCloseError',
        events: [
          {
            name: 'click',
            event: () => {
              this.modal.actionModal = undefined;
              this._MODAL.closeModal('modalUpdateUser');
              if (actionModal === 'success') {
                this.router.navigate([`/dashboard/administrator-user/`]);
              }
            }
          }
        ]
      }
    ];
    this.modal.actionModal = actionModal;

    this.successful = actionModal === 'success';
  }
  private resultSendUser(errorMessage: any) {
    let header;
    let message;
    switch (errorMessage.Message) {
      case "IDENTIFICACION_NUMBER_EXIST":
        header = 'Usuario ya existe';
        message = 'El número de documento ya existe.';
        break;
      case "USER_EMAIL_EXIST":
        header = 'Usuario ya existe';
        message = 'El correo electrónico de usuario ya existe.';
        break;
      case "FORM_VALIDATE":
        header = 'Alerta';
        message = 'Hay datos sin guardar, ¿Desea salir de la página?';
        break;
      default: // 'INTERNAL_SERVER_ERROR'
        header = 'Error al modificar el usuario';
        message = 'El proceso no se terminó satisfactoriamente. Intente nuevamente en unos segundos.';
        break;
    }
    this.showModal(header, message, 'error');
  }
  showValidate(header: string, message: string, actionModal: any) {
    this.modal.header = header;
    const btnFooter: TableItem[] = [
      {
        id: 'btnCloseValidate',
        text: 'No',
        class: 'btnCloseError',
        events: [
          {
            name: 'click',
            event: () => {
              this.closeModal();
              this.subject.next(false)
              this.subject.complete();
            }
          }
        ]
      },
      {
        id: 'btnExit',
        text: 'Sí',
        class: 'btnCloseError',
        events: [
          {
            name: 'click',
            event: () => {
              this.closeModal();
              this.subject.next(true)
              this.subject.complete();

            }
          }
        ]
      }

    ];
    this.settingModal(message, actionModal, btnFooter);
    this.successful = actionModal === 'success';
  }
}

