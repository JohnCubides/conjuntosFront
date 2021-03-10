import { Paginator, IPaginator } from '../paginator/paginator';
import { TableItem } from '../table-item/table-item';
import { SettingTable } from '../setting-table/setting-table';

export class ITable {
    data: any[];
    settingsTitle: SettingTable;
    paginator?: Paginator;
    buttonsAction?: TableItem[];
}
export class Table implements ITable {
    data: any[];
    settingsTitle: SettingTable;
    paginator?: Paginator;
    buttonsAction?: TableItem[];

    constructor(table: ITable) {
        this.data = table.data;
        this.paginator = table.paginator;
        this.buttonsAction = table.buttonsAction;
        this.settingsTitle = table.settingsTitle;
    }
}
