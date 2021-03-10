import { Component, OnInit, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { TableItem } from 'src/app/core/models/table-item/table-item';
import { AbstractModal } from 'src/app/core/models/abstracts/abstract-modal/abstract-modal';
import { PuedeDesactivar } from 'src/app/shareds/form-validate/can-deactivate.guard';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends AbstractModal implements OnInit, PuedeDesactivar {
  public header = 'Crear persona asociada';
  public form: any;
  public btnName = 'SAVE';
  subject: Subject<boolean>;
  public successful = false;
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
  }
  public permitirSalirDeRuta() {
    if (this.form) {
      const validate = this.form.submitted || !this.form.dirty;
      if (!validate) {
        const subject = new Subject<boolean>();
        this.showValidate('Salir de crear persona asociada', '¿Está seguro de que desea salir de la página crear usuario asociado?', 'error');
        this.subject = subject;
        return subject.asObservable();
      }
    }
    return true;
  }
  private showValidate(header: string, message: string, actionModal: any) {
    this.modal.header = header;
    const btnFooter: TableItem[] = [
      {
        id: 'btnErrorClose',
        text: 'No',
        class: 'btnCloseError',
        events: [
          {
            name: 'click',
            event: () => {
              this.closeModal();
              this.subject.next(false);
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
              this.subject.next(true);
              this.subject.complete();
            }
          }
        ]
      }
    ];
    this.settingModal(message, actionModal, btnFooter);
    this.successful = actionModal === 'success';
  }
  private showModal(header: string, message: string, actionModal: any) {
    this.modal.header = header;
    const btnFooter: TableItem[] = [
      {
        id: 'btnErrorClose',
        text: 'Cerrar',
        class: 'btnCloseError',
        events: [
          {
            name: 'click',
            event: () => {
              this.closeModal();
              if (actionModal === 'success') {
                this.router.navigate([`/dashboard/administrator_estate_units/`]);
              }
            }
          }
        ]
      }
    ];
    this.settingModal(message, actionModal, btnFooter);
    this.successful = actionModal === 'success';
  }
  public formEmit(form) {
    this.form = form;
  }
  public saveUser(event: any) {
    console.log(event);
  }
  public createPeopleAssociate(event: any): void {
    event.peopleIncome = 1;
    this.api.post('/AssociatedUserIndependentUnit/Create', event).then(() => {
      this.showModal('Creación de unidad Inmobiliaria', 'Se ha creado a ' + event.names + ' exitosamente.', 'success');
    }, (errorMessage: any) => {
      this.resultSendUser(errorMessage);
    });
    console.log(event);
  }
  private resultSendUser(errorMessage: any) {
    let header = '';
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
        header = 'Error al crear el usuario';
        message = 'El proceso no se terminó satisfactoriamente. Intente nuevamente en unos segundos.';
        break;
    }
    this.showModal(header, message, 'error');
  }
}
