import { Component, OnInit, Injectable, Injector } from '@angular/core';
import { AbstractTable } from 'src/app/core/models/abstracts/abstract-table/abstract-table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-independent-units',
  templateUrl: './admin-independent-units.component.html',
  styleUrls: ['./admin-independent-units.component.scss']
})
@Injectable()
export class AdminIndependentUnitsComponent extends AbstractTable implements OnInit {
  public search: any;
  private url = '';
  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  ngOnInit() {
    this.permitsButton('CONFIG_ADMININDEPENDENTUNIT');
    this.url = `/dashboard/administrator-estate-units/administrator-groupings/${this.route.snapshot.paramMap.get('id')}`;
    this.titleTable = {
      id: 'units',
      name: 'Unidades independientes',
      create: {
        id: 'btn--create-group',
        route: `${this.url}/administrator-group-independent/${this.route.snapshot.paramMap.get('id')}/create/`,
        tooltip: 'Crear unidad independiente'
      }
    };
    this.link = {
      id: 'ESTATE_UNIT_INDEPENDENT_UNIT',
      type: 'link',
      route: `${this.url}/administrator-group-independent/${this.route.snapshot.paramMap.get('id')}/admin-independet-user-units/`
    };             

    this.placeholder = 'UNIT_INDEPENDENT_PLACEHOLDER';
    this.hideButtons(['btn--table-row-view', 'btn--table-row-delete']);
    this.getGroup();
  }
  public getGroup() {
    let searchId: any;
    let search: any;
    if (this.search !== undefined) {
      searchId = this.search.id;
      search = this.search.search;
    } else if (this.search === undefined) {
      searchId = this.route.snapshot.paramMap.get('id');
    }
    this.consultEndpointPost('/IndependentUnit', search, searchId, 'icon_home');
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
          this.getGroup();
        }
      }
    ];
    this.modal.header = `${state === 0 ? 'Inactivar' : ' Activar'} la unidad independiente`;
    this.settingModal(`¿Está seguro que desea  ${state === 0 ? 'inactivar' : ' activar'} la unidad independiente`, 'warning', this.btnYesNo);
  }

  private changeStatus(id: number, state: number) {

    this.api.put('/IndependentUnit/' + id + '/state/' + state).then(() => {
      this.settingModal(`Se ha ${state === 0 ? 'inactivado' : ' activado'} la unidad independiente.`, 'success');
      this.getGroup();
      this.modal.btnClose.events = [
        {
          name: 'click',
          event: () => {
            this.closeModal();
          }
        }
      ];
    }, (error: any) => {
      console.log(error);
    });
  }
  private actionElements(event: any) {
    const element = this.searchAction(event);
    switch (element.action) {
      case 'btn--table-row-edit':
        this.router.navigate([`/dashboard/administrator-estate-units/administrator-groupings/${element.id}/administrator-group-independent/${element.id}/modify/${element.id}`]);
        break;
      case 'btn--table-row-view':
        this.router.navigate([`/dashboard/administrator-estate-units/administrator-groupings/administrator-group-independent/consult/${element.id}`]);
        break;
      case 'chk--table-row-status':
        this.modalChageStatus(element.id, (event.state ? 1 : 0));
        break;
      default:
        console.log('aqui va el del check u otro');
        break;
    }
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
        this.consultEndpointPost('/IndependentUnit/Filter', search.search, search.id, 'icon_home');
      } else {

        this.consultEndpointPost('/IndependentUnit', search.search, search.id, 'icon_home');
      }
    } else {

      this.paginator.page = 1;
      this.consultEndpointPost('/IndependentUnit', undefined, undefined);
    }
  }

  private consultEndpointPost(url: string, searchKeyword: string, dataId: string | undefined, icon?: string) {

    this.api.post(url, { dependencyId: this.route.snapshot.paramMap.get('id'), fieldSearch: dataId, keyword: searchKeyword, pagination: this.paginator }).then((result: any) => {
      const resultSearch: any[] = [];
      if (result) {

        const data = [];
        result.list.forEach(l => {
          data.push({ id: l.id, name: l.name});
        });
        this.namesBread(data, 'administrator-group-independent');

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
              'ESTATE_UNIT_INDEPENDENT_UNIT': group.name,
              'Número de catastro': group.cadastre,
              'Metros Cuadrados': group.squareMeter,
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
