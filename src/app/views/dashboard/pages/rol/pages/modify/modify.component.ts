import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableItem } from 'src/app/core/models/table-item/table-item';
import { AbstractModal } from 'src/app/core/models/abstracts/abstract-modal/abstract-modal';
import { PuedeDesactivar } from 'src/app/shareds/form-validate/can-deactivate.guard'
import { Subject } from 'rxjs';


@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})

export class ModifyComponent extends AbstractModal implements OnInit, PuedeDesactivar {

  public errorMensagge = '';
  public loading = false;
  public jsonRol: any = {
    name: '',
    permits: []
  };
  subject: Subject<boolean>;
  form: any;
  public successful = false;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  ngOnInit(): void {
    this.getPermits();
  }

  permitirSalirDeRuta(): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {

    if (this.form) {
      if (this.form.dirty) {
        const subject = new Subject<boolean>();
        this.showValidate('¡ALERTA!', '¿Está seguro de que desea salir de la página Modificar Rol?', 'error');
        this.subject = subject

        return subject.asObservable();
      }
    }

    return true;
  }

  formEmit(form) {
    this.form = form
  }

  private getPermits() {
    this.api.post('/roles/rolwithpermits', { idrol: this.route.snapshot.paramMap.get('id') }).then((result: any) => {
      this.jsonRol = result.data;
      this.loading = true;
    });
  }

  public sendPermits(event: any): void {
    // tslint:disable-next-line: no-string-literal
    event.idRol = this.jsonRol['idRol'];
    this.api.put(`/roles/${event.idRol}`, event).then((result: any) => {
      this.menssgeResult(result ? result : { status: 204 });
    }, error => {
      this.menssgeResult({ status: error.status, message: error.error.Message, rol: event.name });
    });
  }

  private menssgeResult(result: any) {
    this.errorMensagge = '';
    if (result.status === 204) {
      this.modal.idModal = 'ModifyRol';
      this.modal.header = 'ROL_UPDATE';
      this.settingModal('ROLE_UPDATE_SUCCESSFULL', 'success');
      this.modal.btnClose.events = [
        {
          name: 'click',
          event: () => {
            this.closeModal();
            this.router.navigate([`/dashboard/administrator-rol`]);
          }
        }
      ];
    } else if (result.message === 'ROL_NOT_DELETED_ASSIGNED_USER') {
      this.showModal('Error al actualizar el rol', `No se puede modificarl el rol ${result.rol}, ya que se encuentra autenticado.`, 'error');
    } else {
      this.errorMensagge = 'THE_ROLE_ALREADY_EXISTS';
    }
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

  public errorRol() {
    this.errorMensagge = '';
  }

  showModal(header: string, message: string, actionModal: any) {
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
            }
          }
        ]
      }
    ];
    this.modal.actionModal = actionModal;
    this.successful = actionModal === 'success';
  }

}
