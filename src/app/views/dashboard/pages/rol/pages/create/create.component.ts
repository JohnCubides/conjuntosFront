import { Component, OnInit, Injector } from '@angular/core';
import { RolAndPermissions } from './../../../../../../core/models/rol-and-permissions/rol-and-permissions';
import { AbstractModal } from 'src/app/core/models/abstracts/abstract-modal/abstract-modal';
import { TableItem } from 'src/app/core/models/table-item/table-item';
import { PuedeDesactivar } from 'src/app/shareds/form-validate/can-deactivate.guard'
import { Subject } from 'rxjs';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent extends AbstractModal implements OnInit, PuedeDesactivar {
  
  
  public errorMensagge = '';
  public loading = false;
  public jsonRol: RolAndPermissions = {
    name: '',
    permits: []
  };
  form: any;
  subject: Subject<boolean>;


  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.getPermits();
  }
  private getPermits(): void {
    this.api.get('/roles/permits').then((result: any) => {
      this.getInformation(result);
    });
  }

  permitirSalirDeRuta(): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {

    if (this.form) {
      if (this.form.dirty) {
        const subject = new Subject<boolean>();
        this.showValidate('¡ALERTA!', '¿Está seguro de que desea salir de la página Crear Rol?', 'error');
        this.subject = subject

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
        text: 'Cancelar',
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
        text: 'Salir',
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
  }

  formEmit(form) {
    this.form = form
  }

  private getInformation(result: any): void {
    if (result.data !== undefined || result.data !== null) {
      this.jsonRol.permits = result.data;
      this.loading = true;
    }
  }

  public sendPermits(event: any): void {
    this.api.post('/roles/create', event).then((result: any) => {
      this.menssageResult(result);
    }, error => {
      if (error.error && error.error.Message === 'THE_ROLE_ALREADY_EXISTS') {
        this.errorMensagge = 'THE_ROLE_ALREADY_EXISTS';
      }
    }
    );
  }

  private menssageResult(result: any): void {
    if (result && result.id) {
      this.modal.idModal = 'CreateRol';
      this.modal.header = 'ROL_CREATE';
      this.settingModal('ROLE_CREATE_SUCCESSFULL', 'success');
      this.modal.btnClose.events = [
        {
          name: 'click',
          event: () => {
            this.closeModal();
            this.router.navigate([`/dashboard/administrator-rol`]);
          }
        }
      ];
    } else {
      this.errorMensagge = 'THE_ROLE_ALREADY_EXISTS';
    }
  }

  public errorRol() {
    this.errorMensagge = '';
  }
}
