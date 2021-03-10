import { Component, Injector } from '@angular/core';
import { AbstractModal } from 'src/app/core/models/abstracts/abstract-modal/abstract-modal';
import { TableItem } from 'src/app/core/models/table-item/table-item';
import { ActivatedRoute } from '@angular/router';
import { PuedeDesactivar } from 'src/app/shareds/form-validate/can-deactivate.guard'
import { Subject } from 'rxjs';


@Component({
  selector: 'app-manager-groupings-create',
  templateUrl: './manager-groupings-create.component.html',
  styleUrls: ['./manager-groupings-create.component.scss']
})

export class ManagerGroupingsCreateComponent extends AbstractModal implements PuedeDesactivar {

  public errorMensagge = '';
  public header = 'Crear Agrupación';
  public successful = false;
  form: any;
  subject: Subject<boolean>;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  permitirSalirDeRuta() {
    if (this.form) {
      const validate = this.form.submitted || !this.form.dirty;
      if (!validate) {
        const subject = new Subject<boolean>();
        this.showValidate('Salir de crear agrupación', '¿Está seguro de que desea salir de la página crear agrupación?', 'warning');
        this.subject = subject;
        return subject.asObservable();
      }
    }
    return true;
  }

  formEmit(form: any) {
    this.form = form;
  }

  showValidate(header: string, message: string, actionModal: any) {
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

  public sendGroupUnit(event: any): void {
    event.estateUnit = +this.route.snapshot.paramMap.get('id');
    this.api.post('/Group/Create', event).then(result => {
      this.menssageResult('Crear Agrupación', 'Agrupación creada exitosamente.', 'success');
    },
      (resultError) => {
        this.resultSendUser(resultError.error.Message);
      });
  }

  private menssageResult(header: string, message: string, actionModal: any): void {

    this.modal.header = header;

    this.settingModal(message, actionModal);
    this.modal.btnClose.events = [
      {
        name: 'click',
        event: () => {
          this.closeModal();
          if (actionModal === 'success') {
            this.router.navigate([`dashboard/administrator-estate-units/administrator-groupings/${this.route.snapshot.paramMap.get('id')}`]);
          }
        }
      }
    ];

    this.successful = actionModal === 'success';
  }

  private resultSendUser(errorMessage: any) {
    let header = '';
    let message;
    switch (errorMessage) {
      case 'GROUP_EXCEEDED_MAXIMUM_UNITS':
        header = 'Crear Agrupación';
        message = 'Ha superado el número máximo de unidades independientes contratadas.';
        break;
      case 'GRUOP_NAME_EXISTS':
        header = 'Crear Agrupación';
        message = 'Ya existe una agrupación con ese nombre.';
        break;
      default:
        header = 'Error';
        message = 'Intenta nuevamente en unos minutos. Gracias.';
        break;
    }
    this.menssageResult(header, message, 'error');
  }

}
