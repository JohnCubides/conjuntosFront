import { Component, OnInit, Injectable, Injector } from '@angular/core';
import { AbstractTable } from 'src/app/core/models/abstracts/abstract-table/abstract-table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-users-units',
  templateUrl: './admin-users-units.component.html',
  styleUrls: ['./admin-users-units.component.scss']
})
export class AdminUsersUnitsComponent extends AbstractTable implements OnInit {

  public search: any;
  private url = '';

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);

  }

  ngOnInit() {
    this.permitsButton('CONFIG_ADMININDEPENDENTUNIT');
    this.url = `/dashboard/administrator-estate-units/administrator-groupings/${this.route.snapshot.paramMap.get('id')}`;
    this.titleTable = {
      id: 'admin-user-units',
      name: 'Personas asociadas',
      create: {
        id: 'btn--create-admin-user-units',
        route: `${this.url}/administrator-group-independent/${this.route.snapshot.paramMap.get('id')}/admin-independet-user-units/${this.route.snapshot.paramMap.get('id')}/create/`,
        tooltip: 'Crear persona asociada'
      }
    };

    for (let i = 0; i < this.btnsActionsRow.items.length; i++) {
      if (this.btnsActionsRow.items[i].id === 'btn--table-row-delete') {
        this.btnsActionsRow.items.splice(i, 1);
      }
    }

    this.link = {
      id: 'ADMIN_INDEPENDENT_USER_UNIT',
      type: 'link',
      route: `${this.url}/administrator_group_independent/${this.route.snapshot.paramMap.get('id')}/admin_independet_user_units`
    };
    this.placeholder = 'Busqueda personas asociadas';
    // this.hideButtons(['btn--table-row-view', 'btn--table-row-delete']);
    this.permitsButton('CONFIG_ADMINASSOCIATEDINDEPENDENTUNIT');
    this.UsersUnits();
  }

  public UsersUnits() {
    let searchId: any;
    let search: any;
    if (this.search !== undefined) {
      searchId = this.search.id;
      search = this.search.search;
    } else if (this.search === undefined) {
      searchId = this.route.snapshot.paramMap.get('id');
    }
    this.consultEndpointPost('/AssociatedUserIndependentUnit', search, searchId, 'icon_home');
  }

  public action(event: any) {
    if (event.action) {
      this.actionElements(event.action);
    }
    if (event.paginator) {
      this.actionPaginator(event.paginator);
    }
  }

  public modalChageStatus(roleId: number, state: number) {
    this.btnYesNo[0].events = [
      {
        name: 'click',
        event: () => {
          this.closeModal();
          this.changeStatus(roleId, state);
        }
      }
    ];
    this.btnYesNo[1].events = [
      {
        name: 'click',
        event: () => {
          this.closeModal();
          this.UsersUnits();
        }
      }
    ];
    this.modal.header = `${state === 0 ? 'Inactivar' : ' Activar'} la persona asociada.`;
    this.settingModal(`¿Está seguro que desea  ${state === 0 ? 'inactivar' : ' activar'} la persona asociada.`, 'warning', this.btnYesNo);
  }

  private changeStatus(id: number, state: number) {
    this.api.put(`/AssociatedUserIndependentUnit/${id}/state/${state}`).then(() => {
      this.UsersUnits();
      this.settingModal(`Se ha ${state === 0 ? 'inactivado' : ' activado'} la persona asociada.`, 'success');
      this.modal.btnClose.events = [
        {
          name: 'click',
          event: () => {
            this.closeModal();
          }
        }
      ];
    }).catch(() => {
    });
  }

  private actionElements(event: any) {
    const id = this.route.snapshot.paramMap.get('id');
    const element = this.searchAction(event);
    switch (element.action) {
      case 'btn--table-row-edit':
        this.router.navigate([`/dashboard/administrator-estate-units/administrator-groupings/${id}/administrator-group-independent/${id}/admin-independet-user-units/${id}/modify/${id}`]);
        break;
      case 'btn--table-row-view':
        this.router.navigate([`/dashboard/administrator-estate-units/administrator-groupings/${id}/administrator-group-independent/${id}/admin-independet-user-units/${id}/consult/${id}`]);
        break;
      case 'chk--table-row-status':
        this.modalChageStatus(element.id, (event.state ? 1 : 0));
        break;
      default:
        // console.log('aqui va el del check u otro');
        break;
    }
  }

  public actionPaginator(event: any) {
    this.paginator.quantityToShow = event.quantityToShow;
    this.paginator.page = event.page;
    this.UsersUnits();
  }

  public searchFilter(search: any) {
    this.search = search;
    if (!(search.id && search.search === '')) {
      if (search.id) {
        this.consultEndpointPost('/AssociatedUserIndependentUnit/Filter', search.search, search.id, 'icon_home');
      } else {

        this.consultEndpointPost('/AssociatedUserIndependentUnit', search.search, search.id, 'icon_home');
      }
    } else {

      this.paginator.page = 1;
      this.consultEndpointPost('/AssociatedUserIndependentUnit', undefined, undefined);
    }
  }

  private consultEndpointPost(url: string, searchKeyword: string, dataId: string | undefined, icon?: string) {

    this.api.post(url, { dependencyId: this.route.snapshot.paramMap.get('id'), fieldSearch: dataId, keyword: searchKeyword, pagination: this.paginator }).then((result: any) => {
      const resultSearch: any[] = [];

      if (result) {

        const data = [];
        result.list.forEach(l => {
          data.push({ id: l.id, name: l.names });
        });
        this.namesBread(data, 'admin-independet-user-units');

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
          result.list.forEach((group: any) => {
            resultSearch.push({
              id: group.id,
              'Tipo de persona': group.personType,
              'Nombre': group.names,
              'Número de documento': group.document,
              'Celular': group.squareMeter,
              'chk--table-row-status': group.status === 0 ? false : true
            });
          });
          this.templateSearch([]);
          this.sendTable(resultSearch, result.pagination, this.link);
        }
      }
    });
  }
}
