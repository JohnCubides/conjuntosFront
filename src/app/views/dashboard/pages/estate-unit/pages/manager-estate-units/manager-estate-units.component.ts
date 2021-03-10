import { Component, OnInit, Injector, ɵConsole } from '@angular/core';
import { AbstractTable } from 'src/app/core/models/abstracts/abstract-table/abstract-table';

@Component({
  selector: 'app-manager-estate-units',
  templateUrl: './manager-estate-units.component.html',
  styleUrls: ['./manager-estate-units.component.scss']
})
export class ManagerEstateUnitsComponent extends AbstractTable implements OnInit {
  public dataOriginal = [];
  public search: any;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.placeholder = 'ESTATE_UNIT_PLACEHOLDER';
    this.titleTable = {
      id: 'estateUnits',
      name: 'ESTATE_UNITS',
      create: {
        id: 'btn--create-estate-units',
        route: '/dashboard/administrator-estate-units/create',
        tooltip: 'ESTATE_UNIT_CREATE'
      }
    };
    this.dataIds = [
      { id: 'EstateUnits_Name', text: 'Nombre' },
      { id: 'EstateUnits_Nit', text: 'NIT' },
      { id: 'EstateUnits_Cadastre', text: 'ESTATE_UNIT_CATASTRE' },
      { id: 'EstateUnits_Address', text: 'ADDRESS' }
    ];
    for (let i = 0; i < this.btnsActionsRow.items.length; i++) {
      if (this.btnsActionsRow.items[i].id === 'btn--table-row-delete') {
        this.btnsActionsRow.items.splice(i, 1);
      }
      if (this.btnsActionsRow.items[i].id === 'chk--table-row-status') {
        this.btnsActionsRow.items[i].visible = false;
      }
    }
    this.link = {
      id: 'ESTATE_UNIT',
      type: 'link',
      route: '/dashboard/administrator-estate-units/administrator-groupings'
    };
    this.permitsButton('CONFIG_ADMINESTATEUNITS');
    this.getEstateUnits();
  }

  public getEstateUnits() {
    let searchId: any;
    let search: any;
    if (this.search !== undefined) {
      searchId = this.search.id;
      search = this.search.search;
    }
    this.consultEndpointPost('/estateunits', search, searchId, 'icon_home');
  }

  public action(event: any) {
    // console.log(event);
    if (event.action) {
      this.actionElemts(event.action);
    }
    if (event.paginator) {
      this.actionPaginator(event.paginator);
    }
  }
  public actionPaginator(event: any) {
    this.paginator.quantityToShow = event.quantityToShow;
    this.paginator.page = event.page;
    this.getEstateUnits();
  }

  private actionElemts(event: any) {
    const element = this.searchAction(event);
    switch (element.action) {
      case 'btn--table-row-edit':
        this.router.navigate([`/dashboard/administrator-estate-units/modify/${element.id}`]);
        break;
      case 'btn--table-row-view':
        this.router.navigate([`/dashboard/administrator-estate-units/consult/${element.id}`]);
        break;
      default:
        // console.log('aqui va el del check u otro');
        break;
    }
  }

  public searchFilter(search: any) {
    this.search = search;
    // console.log(search);
    if (!(search.id && search.search === '')) {
      if (search.id) {
        this.consultEndpointPost('/estateunits/filter', search.search, search.id, 'icon_home');
      } else {
        this.consultEndpointPost('/estateunits', search.search, search.id, 'icon_home');
      }
    } else {
      this.paginator.page = 1;
      this.consultEndpointPost('/estateunits', undefined, undefined);
    }
  }
  private consultEndpointPost(url: string, searchKeyword: string, dataId: string | undefined, icon?: string) {
    this.api.post(url, { fieldSearch: dataId, keyword: searchKeyword, pagination: this.paginator }).then((result: any) => {
      const resultSearch: any[] = [];
      if (result) {
        // alimentando breadcrumb
        const data = [];
        result.list.forEach(l => {
          data.push({ id: l.id, name: l.estateUnitName});
        });
        this.namesBread(data, 'administrator-estate-units');
        //
        if (dataId && searchKeyword) {
          if (result.length > 0) {
            result.forEach((e: any) => {
              resultSearch.push(e);
            });
          } else {
            resultSearch.push('No hay data');
          }
          this.consultFilter(resultSearch, dataId, icon);
        } else {
          this.paginator = result.pagination;
          this.dataOriginal = result.list;
          // console.log(result.list);
          result.list.forEach((d: any) => {
            const estateUnit = {
              id: d.id,
              ESTATE_UNIT: d.estateUnitName,
              ADDRESS: d.address,
              NIT: d.nit,
              ESTATE_UNIT_NUMBER_CATASTRE: d.cadastreNumber,
              ESTATE_UNIT_NAME_ADMINISTRATOR: `${d.name.split(' ', 1)} ${d.lastName.split(' ', 1)}`,
              ESTATE_UNIT_DOCUMENT_ADMINISTRATOR: d.identificationNumber,
              'chk--table-row-status': d.status
            };
            resultSearch.push(estateUnit);
          });
          this.templateSearch([]);
          this.dataIds.forEach( data => {
            this.autocomplete(data.id, data.text);
          });
          this.sendTable(resultSearch, result.pagination, this.link);
        }
      }
    });
  }
}
