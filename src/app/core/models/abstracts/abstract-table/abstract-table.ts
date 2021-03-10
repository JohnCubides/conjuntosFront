import { AbstractModal } from '../abstract-modal/abstract-modal';
import { Injector } from '@angular/core';
import { TableItem } from '../../table-item/table-item';
import { Paginator } from '../../paginator/paginator';
import { Table } from '../../table/table';
import { SettingTable } from '../../setting-table/setting-table';
import { BitstableService } from 'src/app/core/services/bitstable/bitstable.service';
import { AbstractFilter } from '../abstract-filter/AbstractFilter';
import { identifierModuleUrl } from '@angular/compiler';
import { DataBreadcrumb } from '../../data-breadcrumb/data-breadcrumb';

export abstract class AbstractTable extends AbstractFilter {
    private tableService: BitstableService;
    private tempBtnsActionsRow: TableItem;
    public link: TableItem;
    public paginator: Paginator = { page: 1, quantityToShow: 4 };
    public btnYesNo: TableItem[] = [
        {
            id: 'btn--footer-yes',
            text: 'Sí',
            class: 'yes',
            events: []
        },
        {
            id: 'btn--footer-no',
            text: 'No',
            class: 'noChanges',
            events: [
                {
                    name: 'click',
                    event: () => {
                        this.closeModal();
                    }
                }
            ]
        }
    ];

    public titleTable: SettingTable = {
        id: 'user',
        name: 'Administración de ',
        create: {
          id: 'btn--create-',
          tooltip: 'Crear',
          route: ''
        }
      };
    public btnsActionsRow: TableItem = {
        id: 'btnActions',
        text: 'Acciones',
        items: [
            {
                id: 'btn--table-row-view',
                type: 'button',
                class: 'icon_view',
                disabled: false
            },
            {
                id: 'btn--table-row-edit',
                type: 'button',
                class: 'icon_edit',
                disabled: false
            },
            {
                id: 'btn--table-row-delete',
                type: 'button',
                class: 'icon_delete',
                disabled: false
            },
            {
                id: 'chk--table-row-status',
                type: 'checkbox',
                disabled: false
            }
        ]
    };
    constructor(injector: Injector) {
        super(injector);
        this.tableService = injector.get(BitstableService);
    }
    public searchAction(event: any): { action: string, id: number } {
        let actionId = '';
        let btnAction = '';
        this.btnsActionsRow.items.forEach(btn => {
            if (event.id.split(btn.id).length > 1) {
                btnAction = btn.id;
                actionId = event.id.split(btn.id)[1];
            }
        });
        return { action: btnAction, id: +actionId };
    }
    public viewDate(dateView: any): string {
        const date = new Date(dateView);
        const year = date.getFullYear();
        const rawMonth = date.getMonth() + 1;
        const month = rawMonth < 10 ? '0' + rawMonth : rawMonth;
        const rawDay = date.getDate();
        const day = rawDay < 10 ? '0' + rawDay : rawDay;
        return day + '/' + month + '/' + year;
    }

    private idPermits(i: TableItem, permit: string, permits: string[]) {
        let search = '';
        switch (i.id) {
            case 'btn--table-row-view':
                search = permit + '_CONSULT';
                break;
            case 'btn--table-row-edit':
                search += permit + '_UPDATE';
                break;
            case 'btn--table-row-delete':
                search += permit + '_DELETE';
                break;
            case 'chk--table-row-status':
                search += permit + '_ACTIVATE';
                break;
        }
        i.disabled = permits.filter((el) => el.toLowerCase().indexOf(search.toLowerCase()) > -1).length > 0;
    }

    private deleteParamsEqualsDataAndActions(dataTable: any[]) {
        dataTable.forEach(d => {
            Object.keys(d).forEach(e => {
                this.tempBtnsActionsRow.items.forEach(i => {
                    if (!i.disabled && i.id === e) {
                        delete d[e];
                    }
                });
            });
        });
        if (!this.titleTable.create.disabled) {
            delete this.titleTable.create.disabled;
        }
    }

    protected permitsButton(permit: string) {
        this.store.select('permits').subscribe((permits: any) => {
            this.tempBtnsActionsRow = Object.assign({}, this.btnsActionsRow);
            this.tempBtnsActionsRow.items.forEach(i => {
                this.idPermits(i, permit, permits.items);
            });
            this.btnsActionsRow.items = [];
            this.tempBtnsActionsRow.items.forEach(i => {
            if (i.disabled) {
              this.btnsActionsRow.items.push(i);
            }
            this.titleTable.create.disabled = permits.items.filter((el) => el.toLowerCase().indexOf(permit + 'CREATE'.toLowerCase()) > -1).length > 0;
          });
        });
    }

    protected sendTable(dataTable: any[], paginatorTable?: Paginator, link?: TableItem) {
        this.deleteParamsEqualsDataAndActions(dataTable);
        const btns = [ this.btnsActionsRow ];
        if (link) {
            btns.push(link);
        }
        const table: Table = {
            data: dataTable,
            settingsTitle: this.titleTable,
            paginator: paginatorTable,
            buttonsAction: btns
          };
        this.tableService.TableTemplate(table);
    }

    protected hideButtons(buttonsId: any[]) {
        buttonsId.forEach(id => {
            this.btnsActionsRow.items = this.btnsActionsRow.items.filter(item => item.id !== id);
        });

    }
    public namesBread(dataList: { id: string, name: string }[], urlData: string) {
        const data: DataBreadcrumb[] = JSON.parse(sessionStorage.getItem('bread'));
        const names: DataBreadcrumb[] = [];
        if (data) {
            data.forEach(d => {
                if (d.url !== urlData) {
                    names.push(d);
                }
            });
        }
        names.push({ url: urlData, data: dataList });
        sessionStorage.setItem('bread', JSON.stringify(names));
    }
}
