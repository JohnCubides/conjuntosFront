import { Component, OnInit, Input, Injector } from '@angular/core';
import { AbstractModal } from 'src/app/core/models/abstracts/abstract-modal/abstract-modal';
import { PuedeDesactivar } from 'src/app/shareds/form-validate/can-deactivate.guard';
import { TableItem } from 'src/app/core/models/table-item/table-item';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-create-estate-unit',
  templateUrl: './create-estate-unit.component.html',
  styleUrls: ['./create-estate-unit.component.scss']
})
export class CreateEstateUnitComponent extends AbstractModal implements OnInit, PuedeDesactivar {

  public header = 'ESTATE_UNIT_CREATE';
  public btnName = 'SAVE';
  form: any;
  subject: Subject<boolean>;
  public successful = false;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  permitirSalirDeRuta() {
    if (this.form) {
      let validate = this.form.submitted || !this.form.dirty;
      if (!validate) {
        const subject = new Subject<boolean>();
        this.showValidate('Salir de crear unidad inmobiliaria', '¿Está seguro de que desea salir de la página crear unidad inmobiliaria?', 'error');
        this.subject = subject;
        return subject.asObservable();
      }
    }
    return true;
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

  formEmit(form) {
    this.form = form;
  }

  saveStateUnit(event: any) {

    delete event.countrySelector;
    delete event.stateSelector;
    delete event.mobileCountry;
    delete event.phoneCountry;

    this.api.post('/EstateUnits/Create', event).then(() => {
      this.showModal('Creación de unidad Inmobiliaria', 'Se ha creado la unidad inmobiliaria ' + event.estateUnitName + ' exitosamente.', 'success');
    }, (errorMessage: any) => {
      this.resultSendEstate(errorMessage);
    });
  }


  showModal(header: string, message: string, actionModal: any) {
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
                this.router.navigate([`/dashboard/administrator-estate-units/`]);
              }
            }
          }
        ]
      }
    ];
    this.settingModal(message, actionModal, btnFooter);
    this.successful = actionModal === 'success';
  }

  private resultSendEstate(errorMessage: any) {
    let header = '';
    let message;
    switch (errorMessage.error.Message) {
      case 'THE_ADDRESS_EXIST':
        header = 'La dirección ya existe';
        message = 'La dirección ya se encuentra asociada a otra unidad inmobiliaria.';
        break;
      case 'THE_NIT_EXIST':
        header = 'El NIT ya existe';
        message = 'El NIT ya se encuentra asociado a otra unidad inmobiliaria.';
        break;
      case 'THE_PHONE_EXIST':
        header = 'El teléfono ya existe';
        message = 'El teléfono ya se encuentra asociado a otra unidad inmobiliaria.';
        break;
      case 'THE_CADASTRE_NUMBER_EXIST':
        header = 'El número de catastro ya existe';
        message = 'El número de catastro ya se encuentra asociado a otra unidad inmobiliaria.';
        break;
      case 'THE_EMAIL_EXIST':
        header = 'El correo ya existe';
        message = 'El correo electrónico ya se encuentra asociado a otro representante';
        break;

      default: // 'INTERNAL_SERVER_ERROR'
        header = 'Error al crear la unidad inmobiliaria';
        message = 'El proceso no se terminó satisfactoriamente. Intente nuevamente en unos segundos.';
        break;
    }
    this.showModal(header, message, 'error');
  }
}
