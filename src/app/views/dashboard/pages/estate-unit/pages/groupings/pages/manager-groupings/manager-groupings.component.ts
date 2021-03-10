import { Component, OnInit, Injectable, Injector } from '@angular/core';
import { AbstractTable } from 'src/app/core/models/abstracts/abstract-table/abstract-table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './manager-groupings.component.html',
  styleUrls: ['./manager-groupings.component.scss']
})

@Injectable()
export class ManagerGroupingsComponent extends AbstractTable implements OnInit {
  public search: any;

  public estateUnitId = '';
  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  ngOnInit() {

    this.estateUnitId = this.route.snapshot.paramMap.get('id');
    this.permitsButton('CONFIG_ADMINGROUP');
    const url = `/dashboard/administrator-estate-units/administrator-groupings/${this.estateUnitId}`;
    this.titleTable = {
      id: 'groups',
      name: 'Unidad inmobiliaria',
      create: {
        id: 'btn--create-group',
        route: `${url}/create/${this.estateUnitId}`,
        tooltip: 'Crear agrupación'
      }
    };
    this.link = {
      id: 'ESTATE_UNIT_GROUPING',
      type: 'link',
      route: `${url}/administrator-group-independent`
    };
    this.placeholder = 'ESTATE_UNIT_GROUPING_PLACEHOLDER';
    this.hideButtons(['btn--table-row-view', 'btn--table-row-delete']);
    // this.permitsButton('CONFIG_ADMINGROUP');
    this.getGroup();
  }

  public getGroup() {
    let searchId: any;
    let search: any;
    if (this.search !== undefined) {
      searchId = this.search.id;
      search = this.search.search;
    }
    this.consultEndpointPost('/Group', search, searchId, 'icon_home');
  }

  public action(event: any) {
    if (event.action) {
      this.actionElements(event.action);
    }
    if (event.paginator) {
      this.actionPaginator(event.paginator);
    }
  }

  private actionElements(event: any) {
    const element = this.searchAction(event);
    switch (element.action) {
      case 'btn--table-row-edit':
        this.router.navigate([`/dashboard/administrator-estate-units/administrator-groupings/${element.id}/modify/${element.id}`]);
        break;
      case 'btn--table-row-view':
        this.router.navigate([`/dashboard/administrator-estate-units/administrator-groupings/${element.id}/consult/${element.id}`]);
        break;
      case 'chk--table-row-status':
        this.modalChageStatus(element.id, (event.state ? 1 : 0));
        break;
      default:
        console.log('aqui va el del check u otro');
        break;
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
          this.getGroup();
        }
      }
    ];
    this.modal.header = `${state === 0 ? 'Inactivar' : ' Activar'} la agrupación`;
    this.settingModal(`¿Está seguro que desea  ${state === 0 ? 'inactivar' : ' activar'} la agrupación`, 'warning', this.btnYesNo);
  }

  private changeStatus(roleId: number, state: number) {
    this.api.put(`/Group/${roleId}/state/${state}`).then(() => {
      this.getGroup();
      this.settingModal(`Se ha ${state === 0 ? 'inactivado' : ' activado'} la agrupación.`, 'success');
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

  public actionPaginator(event: any) {
    this.paginator.quantityToShow = event.quantityToShow;
    this.paginator.page = event.page;
    this.getGroup();
  }


  public searchFilter(search: any) {
    this.search = search;
    if (!(search.id && search.search === '')) {
      if (search.id) {
        this.consultEndpointPost('/Group/filter', search.search, search.id, 'icon_home');
      } else {
        this.consultEndpointPost('/Group', search.search, search.id);
      }
    } else {
      this.paginator.page = 1;
      this.consultEndpointPost('/Group', undefined, undefined);
    }
  }
  private consultEndpointPost(url: string, searchKeyword: string, dataId: string | undefined, icon?: string) {
    this.api.post(url, {  dependencyId: this.estateUnitId, fieldSearch: dataId, keyword: searchKeyword, pagination: this.paginator }).then((result: any) => {
      const resultSearch: any[] = [];
      if (result) {

        const data = [];
        result.list.forEach(l => {
          data.push({ id: l.id, name: l.name});
        });
        this.namesBread(data, 'administrator-groupings');

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
              ESTATE_UNIT_GROUPING: group.name,
              ESTATE_UNIT_GROUPING_NUMBER_INDEPENDENT_UNIT: group.independentAmount,
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
