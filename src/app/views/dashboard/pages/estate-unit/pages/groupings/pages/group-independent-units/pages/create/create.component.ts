import { Component, Injector } from '@angular/core';
import { AbstractModal } from 'src/app/core/models/abstracts/abstract-modal/abstract-modal';
import { TableItem } from 'src/app/core/models/table-item/table-item';
import { PuedeDesactivar } from 'src/app/shareds/form-validate/can-deactivate.guard'
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends AbstractModal implements PuedeDesactivar {

  public errorMensagge = '';
  public header = 'Crear Unidad independiente';
  public successful = false;
  form: any;
  subject: Subject<boolean>;
  public estateUnit: number;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  permitirSalirDeRuta() {

    if (this.form) {
      let validate = this.form.submitted || !this.form.dirty
      if (!validate) {
        const subject = new Subject<boolean>();
        this.showValidate('Salir de crear unidad independiente', '¿Está seguro de que desea salir de la página crear unidad independiente?', 'warning');
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


  ngOnInit() {

    this.api.get(`/Group/${this.route.snapshot.paramMap.get('id')}`).then((result: any) => {
      this.estateUnit = result.estateUnit;
    });

  }

  public createUnitIndependent(event: any): void {
    this.api.post('/IndependentUnit/Create', event).then(result => {
      this.menssageResult('Crear unidad independiente', 'Unidad creada exitosamente', 'success')
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
                this.router.navigate([`/dashboard/administrator-estate-units/administrator-groupings/${this.estateUnit}/administrator-group-independent/${this.route.snapshot.paramMap.get('id')}`]);
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
      case 'THE_CADASTRE_NUMBER_EXIST':
        header = 'Unidad ya existe';
        message = 'El número de catastro ya existe.';
        break;
      case 'INDEPEDENT_UNIT_NAME_EXISTS':
        header = 'Unidad ya existe';
        message = 'Ya existe una unidad con el mismo nombre.';
        break;
      case 'INDEPEDENT_UNIT_EXCEEDED_MAXIMUM_UNITS':
        header = 'Crear Unidad Independiente';
        message = 'Ha superado el número máximo de Unidades Independientes contratadas.';
        break;
      default:
        header = 'Error';
        message = 'Intenta nuevamente en unos minutos. Gracias.';
        break;
    }
    this.menssageResult(header, message, 'error');
  }
}
