import { Component, OnInit, Injector } from '@angular/core';
import { AbstractModal } from 'src/app/core/models/abstracts/abstract-modal/abstract-modal';
import { EstateUnits } from 'src/app/core/models/estate-units/estate-unit';
import { ActivatedRoute } from '@angular/router';
import { TableItem } from 'src/app/core/models/table-item/table-item';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-update-estate-units',
  templateUrl: './update-estate-units.component.html',
  styleUrls: ['./update-estate-units.component.scss']
})
export class UpdateEstateUnitsComponent extends AbstractModal implements OnInit {

  public unitModel: EstateUnits;

  public header = 'ESTATE_UNIT_UPDATE';
  public btnName = 'SAVE';
  estateUnitId: number;
  idRepresentative: number;
  form: any;
  subject: Subject<boolean>;
  public successful = false;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  ngOnInit(): void {
    this.getEstateUnitId();
    this.getEstateUnit();
  }

  permitirSalirDeRuta() {

    if (this.form) {
      let validate = this.form.submitted || !this.form.dirty
      if (!validate) {
        const subject = new Subject<boolean>();
        this.showValidate('Salir de modificar unidad inmobiliaria', '¿Está seguro de que desea salir de la página modificar unidad inmobiliaria?', 'warning');
        this.subject = subject

        return subject.asObservable();
      }
    }

    return true;

  }

  formEmit(form) {
    this.form = form
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


  getEstateUnitId() {
    this.estateUnitId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
  }


  public getEstateUnit(): void {
    this.api.get('/EstateUnits/' + this.estateUnitId).then((result: any) => {
      this.unitModel = result;
      this.getUserById(this.unitModel);
    });
  }


  public getUserById(unitModel: any): void {
    this.api.get('/users/user/' + unitModel.identificationTypeId + '/' + unitModel.identificationNumber).then((result: any) => {
      this.idRepresentative = result.id;
    });
  }

  update(event: any) {

    delete event.countrySelector;
    delete event.stateSelector;
    delete event.mobileCountry;
    delete event.phoneCountry;

    event.idRepresentative = this.idRepresentative;
    event.id = this.estateUnitId;

    this.api.put('/EstateUnits/' + this.estateUnitId, event).then(() => {
      this.showModal('Modificación unidad inmobiliaria', 'Se ha Modificado la unidad inmobiliaria ' + event.estateUnitName + ' exitosamente.', 'success');
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
                console.log('entre aqui')
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
