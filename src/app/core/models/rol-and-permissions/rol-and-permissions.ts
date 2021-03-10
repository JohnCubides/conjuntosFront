import { TreePermissions } from '../tree-permissions/tree-permissions';

export interface IRolAndPermissions {
    name: string | undefined;
    permits ?: TreePermissions[] | undefined;
}
export class RolAndPermissions implements IRolAndPermissions {
    name: string | undefined;
    permits ?: TreePermissions[] | undefined;

    constructor(rol: IRolAndPermissions) {
        this.name = rol.name;
        this.permits  = rol.permits ;
    }
}
