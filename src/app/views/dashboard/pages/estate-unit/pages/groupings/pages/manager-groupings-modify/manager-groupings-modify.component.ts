import { Component, Injector, OnInit } from '@angular/core';
import { AbstractModal } from 'src/app/core/models/abstracts/abstract-modal/abstract-modal';
import { ActivatedRoute } from '@angular/router';
import { TableItem } from 'src/app/core/models/table-item/table-item';
import { GroupUnitsIndependent } from 'src/app/core/models/groups-units/group-units';
import { PuedeDesactivar } from 'src/app/shareds/form-validate/can-deactivate.guard'
import { Subject } from 'rxjs';


@Component({
  selector: 'app-manager-groupings-modify',
  templateUrl: './manager-groupings-modify.component.html',
  styleUrls: ['./manager-groupings-modify.component.scss']
})


export class ManagerGroupingsModifyComponent extends AbstractModal implements OnInit, PuedeDesactivar {

  public errorMensagge = '';
  public header = 'Modificar agrupación';
  public group: GroupUnitsIndependent;
  public successful = false;
  form: any;
  subject: Subject<boolean>;

  public estateUnit = 0;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  ngOnInit(): void {
    this.getGroups();
  }

  public getGroups(): void {

    this.api.get(`/Group/${this.route.snapshot.paramMap.get('id')}`).then((result: any) => {
      this.group = result as GroupUnitsIndependent;
      this.estateUnit = result.estateUnit
    },
      (resultError) => {
        console.log(resultError);
      });
  }

  permitirSalirDeRuta() {

    if (this.form) {
      let validate = this.form.submitted || !this.form.dirty
      if (!validate) {
        const subject = new Subject<boolean>();
        this.showValidate('Salir de modificar agrupación', '¿Está seguro de que desea salir de la página modificar agrupación?', 'warning');
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
        id: 'btnErrorClose',
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
              this.router.navigate([`dashboard/administrator-estate-units/administrator-groupings/${this.estateUnit}`]);
            }
          }
        ]
      }

    ];
    this.settingModal(message, actionModal, btnFooter);
    this.successful = actionModal === 'success';
  }

  public sendGroupUnit(event: any): void {

    this.api.put(`/Group/${this.route.snapshot.paramMap.get('id')}`, event).then(result => {
      this.showModal();
    },
      (resultError) => {
        this.resultSendUser(resultError.error.Message);
      });
  }


  showModal(): void {
    this.modal.idModal = 'ModifyGroup';
    this.modal.header = 'Modificar Agrupación';
    this.settingModal('Se ha modificado la agrupación exitosamente.', 'success');
    this.modal.btnClose.events = [
      {
        name: 'click',
        event: () => {
          this.closeModal();
          this.router.navigate([`dashboard/administrator-estate-units/administrator-groupings/${this.estateUnit}`]);
        }
      }
    ];
  }


  private resultSendUser(errorMessage: any) {
    let header = '';
    let message;
    switch (errorMessage) {
      case 'GROUP_EXCEEDED_MAXIMUM_UNITS':
        header = 'Modificar Agrupación';
        message = 'Excedió el número máximo de unidades independientes.';
        break;
      case 'GRUOP_NAME_EXISTS':
        header = 'Modificar Agrupación';
        message = 'Ya existe una agrupación con ese nombre.';
        break;
      default:
        header = 'Error';
        message = 'Intenta nuevamente en unos minutos. Gracias.';
        break;
    }
    this.menssageResult(header, message, 'error');
  }

  private menssageResult(header: string, message: string, actionModal: any): void {

    this.modal.header = header;

    this.settingModal(message, actionModal);
    this.modal.btnClose.events = [
      {
        name: 'click',
        event: () => {
          this.closeModal();
        }
      }
    ];
    this.successful = actionModal === 'success';
  }

}
