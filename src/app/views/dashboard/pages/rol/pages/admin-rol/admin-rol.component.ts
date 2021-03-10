import { Component, OnInit, Injectable, Injector } from '@angular/core';
import { AbstractTable } from './../../../../../../core/models/abstracts/abstract-table/abstract-table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin-rol.component.html',
  styleUrls: ['./admin-rol.component.scss']
})
@Injectable()
export class AdminRolComponent extends AbstractTable implements OnInit {
  private roleDescription;
  private stateDescription;
  public data: any[] = [];
  public dataOriginal = [];
  public keywordRole: string;
  public methodConfirmModal: string;
  private roleId: number;
  private newState: number;
  public search: any;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.titleTable = {
      id: 'rol',
      name: 'Administración de Roles',
      create: {
        id: 'btn--create-rol',
        route: '/dashboard/administrator-rol/create',
        tooltip: 'ROL_CREATE'
      }
    };
    this.dataIds = [
      { id: 'Role_Description', text: 'Rol' }
    ];
    this.permitsButton('CONFIG_ADMINROLE');
    this.placeholder = 'ROL_PLACEHOLDER';
    this.getAllRoles();
  }

  public getAllRoles() {
    let searchId: any;
    let search: any;
    if (this.search !== undefined) {
      searchId = this.search.id;
      search = this.search.search;
    }
    this.consultEndpointPost('/roles', search, searchId, 'icon_home');
  }

  public action(event: any) {
    if (event.action) {
      this.actionElemts(event.action);
    }
    if (event.paginator) {
      this.actionPaginator(event.paginator);
    }
  }

  private actionElemts(event: any) {
    const element = this.searchAction(event);
    switch (element.action) {
      case 'btn--table-row-edit':
        this.router.navigate([`/dashboard/administrator-rol/modify/${element.id}`]);
        break;
      case 'btn--table-row-view':
        this.router.navigate([`/dashboard/administrator-rol/consult/${element.id}`]);
        break;
      case 'btn--table-row-delete':
        this.modalDeleteChanges(element.id);
        break;
      case 'chk--table-row-status':
        this.modalDeleteChanges(element.id, event.state);
        break;
      default:
        console.log('aqui va el del check u otro');
        break;
    }
  }

  public actionPaginator(event: any) {
    this.paginator.quantityToShow = event.quantityToShow;
    this.paginator.page = event.page;
    this.getAllRoles();
  }

  public getRoleWithKeyword() {
    this.api.get(`/Roles/keyword/${this.keywordRole}`).then((result: any) => {
      if (result) {
        result.forEach((rol: any) => {
          const role = { id: rol.id, descripcion: rol.description, state: rol.state };
          this.data = [...this.data, role];
        });
      }
    });
  }

  private modalDeleteChanges(roleId: number, state?: boolean) {
    this.stateDescription = 'eliminar';
    if (state !== undefined) {
      this.newState = state ? 1 : 0;
      this.stateDescription = state ? 'activar' : 'Inactivar';
    }
    this.roleId = roleId;
    this.getRoleDescriptionById();
    this.btnYesNo[0].events = [
      {
        name: 'click',
        event: () => {
          this.closeModal();
          if (state !== undefined) {
            this.actionRol('change');
          } else {
            this.actionRol('delete');
          }
        }
      }
    ];
    this.btnYesNo[1].events = [
      {
        name: 'click',
        event: () => {
          this.getAllRoles();
          this.closeModal();
        }
      }
    ];
    this.modal.header = `${this.stateDescription[0].toUpperCase() + this.stateDescription.substr(1).toLowerCase()} rol ${this.roleDescription}`;
    this.settingModal(this.getMessageQuestion(), 'warning', this.btnYesNo);
  }

  private actionRol(action: 'delete' | 'change'): void {
    let promiseAction: Promise<any>;
    if (action === 'delete') {
      promiseAction = this.api.delete(`/roles/${this.roleId}`);
    } else {
      promiseAction = this.api.put(`/roles/${this.roleId}/state/${this.newState}`);
    }
    promiseAction.then(() => {
      const message = action === 'delete' ? this.messageConfirmation(true, true) : this.messageConfirmation(true);
      this.settingModal(message, 'success');
      this.modal.btnClose.events = [
        {
          name: 'click',
          event: () => {
            this.getAllRoles();
            this.closeModal();
          }
        }
      ];
    }).catch(() => {
      const message = action === 'delete' ? this.messageConfirmation(false, true) : this.messageConfirmation(false);
      this.settingModal(message, 'error');
      this.modal.btnClose.events = [
        {
          name: 'click',
          event: () => {
            this.getAllRoles();
            this.closeModal();
          }
        }
      ];
    });
  }

  private getRoleDescriptionById() {
    this.roleDescription = this.dataOriginal.find(role => role.id === this.roleId).description;
  }

  private getMessageQuestion(): string {
    return `¿Está seguro de ${this.stateDescription} el rol ${this.roleDescription} ?`;
  }


  private messageConfirmation(isSuccess: boolean, isDelete?: boolean): string {
    if (isSuccess) {
      const description = (isDelete) ? 'eliminó' : (this.newState) ? 'activó' : 'inactivó';
      return `Se ${description} el rol ${this.roleDescription}.`;
    }
    return `No fue posible ${this.stateDescription} el rol ${this.roleDescription} se encuentra asignado a uno o varios usuarios.`;
  }



  public searchFilter(search: any) {
    this.search = search;
    if (!(search.id && search.search === '')) {
      if (search.id) {
        this.consultEndpointPost('/roles/filter', search.search, search.id, 'icon_home');
      } else {
        this.consultEndpointPost('/roles', search.search, search.id);
      }
    } else {
      this.paginator.page = 1;
      this.consultEndpointPost('/roles', undefined, undefined);
    }
  }
  private consultEndpointPost(url: string, searchKeyword: string, dataId: string | undefined, icon?: string) {
    this.api.post(url, { fieldSearch: dataId, keyword: searchKeyword, pagination: this.paginator }).then((result: any) => {
      const resultSearch: any[] = [];
      if (result) {
        const data = [];
        result.list.forEach(l => {
          data.push({ id: l.id, name: l.description});
        });
        this.namesBread(data, 'administrator-rol');
        if (dataId && searchKeyword) {
          result.forEach((e: any) => {
            resultSearch.push(e);
          });
          this.consultFilter(resultSearch, dataId, icon);
        } else {
          this.dataIds.forEach(data => {
            this.autocomplete(data.id, data.text);
          });
          this.paginator = result.pagination;
          this.dataOriginal = result.list;
          result.list.forEach((rol: any) => {
            const role = { id: rol.id, Descripción: rol.description, 'chk--table-row-status': rol.status };
            resultSearch.push(role);
          });
          this.templateSearch([]);
          this.sendTable(resultSearch, result.pagination);
        }
      }
    });
  }

}
