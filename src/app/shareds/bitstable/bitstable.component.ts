import { Component, OnInit, EventEmitter, ElementRef, ViewChild, Injector, Output, OnDestroy } from '@angular/core';
import { Paginator } from './../../core/models/paginator/paginator';
import { TableItem } from './../../core/models/table-item/table-item';
import { SettingTable } from './../../core/models/setting-table/setting-table';
import { EventsForms } from './../../core/models/events-forms/events-forms';
import { BitstableService } from 'src/app/core/services/bitstable/bitstable.service';
import { Table } from 'src/app/core/models/table/table';
import { PaginatorService } from 'src/app/core/services/paginator/paginator.service';
import { debug } from 'console';

declare const Retract: any;

@Component({
  selector: 'app-bitstable',
  templateUrl: './bitstable.component.html',
  styleUrls: ['./bitstable.component.scss']
})
export class BitstableComponent extends EventsForms implements OnInit, OnDestroy {

  public paginator: Paginator;
  public settingsTitle: SettingTable;
  public isAction = '';
  private objectData: any;
  public tooltipAdd = false;
  public retract = false;
  public error = false;
  @Output() public responseAction = new EventEmitter<any>();
  @ViewChild('rootForm', { static: true }) rootForm: ElementRef;
  @ViewChild('createAdd', { static: true }) createAdd: ElementRef;

  public displayedColumns: string[] = [];
  public dataSource: any[];
  public searchEmpty = 'SEARCH_EMPTY';

  constructor(injector: Injector,
              private bitsTable: BitstableService,
              private paginatorService: PaginatorService) {
    super(injector);
  }

  ngOnInit(): void {
    this.objectData = this.bitsTable.OnTable.subscribe((result: Table) => {
      this.error = true;
      if (result && result.data && result.data.length > 0) {
        this.error = false;
      }
      this.initTable(result);
      this.addPaginator(result.paginator);
      if (this.displayedColumns.length > 2) {
        window.setTimeout(() => {
          const retractTable = new Retract({
            class_title: 'open_retract_js'
          });
          retractTable.init();
        }, 1000);
      }
    });
  }

  ngOnDestroy() {
    if (this.objectData) {
      this.objectData.unsubscribe();
    }
  }

  private initTable(dataTable: Table): void {
    const action = dataTable.data;

    this.settingsTitle = dataTable.settingsTitle;

    if (this.settingsTitle && this.settingsTitle.create) {
      this.events([], this.createAdd, this.settingsTitle.create);
    }

    this.convertData(action, dataTable.buttonsAction);

    action.forEach(dataAction => {
      delete dataAction.id;
    });

    this.displayColumns(action);
    this.dataSource = action;
  }

  private addPaginator(add: Paginator): void {
    if (add) {
      this.paginator = add;
      this.paginatorService.PaginatorTemplate(add);
    }
  }

  private convertData(action: any[], btnAction?: TableItem[]): void {
    this.addBtnResponsive(btnAction[0]);
    action.forEach(d => {
      const id = d[Object.keys(d)[0]];
      let styleClass = '';
      if (btnAction) {
        styleClass = this.styleRow(d, btnAction[0]);
      }
      Object.keys(d).forEach(e => {
        const elementRow: TableItem = { id: (e.trim() + '-' + id + '-' + this.settingsTitle.id), text: (d[e]), type: 'text', class: styleClass };
        if (btnAction.length > 1 && btnAction[1].id === e) {
          elementRow.type = btnAction[1].type;
          elementRow.route = `${btnAction[1].route}/${id}`;
        }
        if (styleClass === ' shading-row') {
          elementRow.type = 'text';
        }
        d[e] = [elementRow];
      });
      if (btnAction) {
        this.addBtnActions(d, id, btnAction[0]);
      }
    });
  }

  private addBtnActions(d: any, id: any, btnAction: TableItem) {
    d[btnAction.text] = [];
    btnAction.items.forEach((btn: TableItem) => {
      d[btnAction.text].push(Object.assign({}, btn));
    });
    d[btnAction.text].forEach((btn: TableItem) => {
      Object.keys(d).forEach(e => {
        if (btn.type === 'checkbox' && btn.id === e) {
          btn.state = d[e][0].text;
          delete d[e];
        }
      });
      btn.id += id;
    });
  }

  private addBtnResponsive(btnAction?: TableItem) {
    const btnResponsive: TableItem = {
      id: 'btnResponsive',
      type: 'button',
      class: 'open_retract_js icon_triangle'
    };
    if (!btnAction) {
      btnAction = {
        id: 'responsive',
        text:  '',
        items: [
          btnResponsive
        ]
      };
    } else {
      let valid = false;
      this.isAction = 'is_action';
      btnAction.items.forEach(btn => {
        if (btn.id === btnResponsive.id) {
          valid = true;
        }
      });
      if (!valid) {
        btnAction.items.push(btnResponsive);
      }
    }
  }

  private styleRow(d: any, btnAction: TableItem): string {
    let styleClass = '';
    btnAction.items.forEach(btn => {
      btn.visible = btn.visible === undefined ? true : btn.visible;
      Object.keys(d).forEach(e => {
        if (btn.type === 'checkbox' && btn.id === e && !d[e]) {
          styleClass = ' shading-row';
        }
      });
    });
    return styleClass;
  }

  private displayColumns(action: any[]): void {
    this.displayedColumns = [];
    action.forEach(dt => {
      Object.keys(dt).forEach(key => {
        if (this.displayedColumns.indexOf(key) === -1) {
          this.displayedColumns.push(key);
        }
        dt[key].forEach((dtk: TableItem) => {
          this.events(dt[key], this.rootForm, dtk);
        });
      });
    });
  }

  public resultActions(idElement: string, stateElement: any): void {
    if (!idElement.includes('btnResponsive')) {
      const actionElement = { id: idElement, state: (stateElement !== undefined) ? stateElement.target.checked : stateElement };
      this.responseAction.emit({ action: actionElement });
    } else {
      this.retract = !this.retract;
    }
  }
  public routeElement(item: TableItem): string {
    let route = '';
    if (item && item.route) {
      route = item.route;
    }
    return route;
  }

  public changePages(paginator: any, page?: boolean): void {
    if (paginator.page) {
      this.paginator.page = paginator.page;
    } else if (page) {
      this.paginator.page = paginator.searchNumber;
    } else {
      this.paginator.quantityToShow = paginator.searchNumber === '' ? 1 : paginator.searchNumber;
      this.paginator.page = 1;
    }
    this.responseAction.emit({ paginator: this.paginator });
  }

  public styleResponsive(idElement: string, styleClass: string ): string {
    let style = styleClass;
    if (idElement.includes('btnResponsive')) {
      style = styleClass + (this.retract ? '2' : '');
    }
    return style;
  }
}
