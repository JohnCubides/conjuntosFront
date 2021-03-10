export interface ITreePermissions {
    id: number;
    name: string | undefined;
    state?: boolean | false;
    sonsPermits?: ITreePermissions[] | undefined;
}
export class TreePermissions implements ITreePermissions {
    id: number;
    name: string | undefined;
    state?: boolean | false;
    sonsPermits?: ITreePermissions[] | undefined;

    constructor(tree: ITreePermissions) {
        this.name = tree.name;
        this.state = tree.state === undefined ? false : tree.state;
        this.sonsPermits = tree.sonsPermits;
    }
}
