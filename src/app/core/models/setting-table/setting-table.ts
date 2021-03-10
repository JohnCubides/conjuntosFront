import { TableItem } from '../table-item/table-item';

export interface ISettingTable {
    id: string | undefined;
    name: string | undefined;
    create?: TableItem | undefined;
}
export class SettingTable implements ISettingTable {
    id: string | undefined;
    name: string | undefined;
    create?: TableItem | undefined;

    constructor(rol: ISettingTable) {
        this.id = rol.id;
        this.name = rol.name;
        this.create = rol.create;
    }
}
