import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';
import { AbstractModal } from 'src/app/core/models/abstracts/abstract-modal/abstract-modal';
import { TableItem } from 'src/app/core/models/table-item/table-item';
import { Independentunit } from 'src/app/core/models/independent-unit/independent-unit';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PuedeDesactivar } from 'src/app/shareds/form-validate/can-deactivate.guard'
import { Subject } from 'rxjs';


@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent extends AbstractModal implements PuedeDesactivar {

  @Input() public unitModel: Independentunit;
  @Output() public resultIndependentUnit = new EventEmitter<any>();
  public getform: Independentunit;
  public status: number;
  public groupId: number;
  public estateUnit: number;
  public errorMensagge = '';
  public header = 'Modificar Unidad independiente';
  public unitComplex: FormGroup;
  public successful = false;
  form: any;
  subject: Subject<boolean>;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  ngOnInit() {
    this.api.get('/IndependentUnit/' + this.route.snapshot.paramMap.get('id')).then((result: any) => {
      this.getform = result;
      this.status = result.status;
      this.groupId = result.groupId;
      this.api.get(`/Group/${result.groupId}`).then((result: any) => {
        this.estateUnit = result.estateUnit;
      });

    });
  }

  permitirSalirDeRuta() {

    if (this.form) {
      let validate = this.form.submitted || !this.form.dirty
      if (!validate) {
        const subject = new Subject<boolean>();
        this.showValidate('Salir de modificar unidad independiente', '¿Está seguro de que desea salir de la página modificar unidad independiente?', 'warning');
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
            }
          }
        ]
      }

    ];
    this.settingModal(message, actionModal, btnFooter);
    this.successful = actionModal === 'success';
  }

  public sendGroupUnit(event: any): void {
    const unit = Object.assign({}, event);
    unit.status = this.status;
    unit.groupid = this.groupId;
    unit.id = this.getform.id;
    this.api.put(`/independentUnit/${this.route.snapshot.paramMap.get('id')}`, unit).then(() => {
      this.menssageResult('Modificar Unidad Independiente', 'Unidad Independiente modificado exitosamente', 'success');
    },
      (resultError) => {
        this.resultSendUser(resultError.error.Message);
      });
  }
  private menssageResult(header: string, message: string, actionModal: any): void {
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
                this.router.navigate([`/dashboard/administrator-estate-units/administrator-groupings/${this.estateUnit}/administrator-group-independent/${this.groupId}`]);
              }
            }
          }
        ]
      }
    ];
    this.settingModal(message, actionModal, btnFooter);
    this.successful = actionModal === 'success';
  }
  private resultSendUser(errorMessage: any) {
    let header = '';
    let message;
    switch (errorMessage) {
      case 'INDEPENDENT_UNIT_NOT_EXIST':
        header = 'Unidad independiente no existe';
        message = 'La unidad independiente no existe.';
        break;
      case 'INDEPENDENT_UNIT_NAME_EXISTS':
        header = 'El nombre de la unidad independiente ya existe';
        message = 'El nombre de la unidad independiente ya está en uso, por favor ingresar uno diferente.';
        break;
      case 'CADASTRE_EXISTS':
        header = 'El número de catastro ya existe';
        message = 'El número de catastro ya está en uso, por favor ingresar uno diferente.';
        break;
      default: // 'INTERNAL_SERVER_ERROR'
        header = 'Error al modificar la unidad independiente';
        message = 'El proceso no se terminó satisfactoriamente. Intente nuevamente en unos segundos.';
        break;
    }
    this.menssageResult(header, message, 'error');
  }
}
