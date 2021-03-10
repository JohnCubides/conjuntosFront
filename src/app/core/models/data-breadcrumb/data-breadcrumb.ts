export class IDataBreadcrumb {
    url: string;
    data: { id: string, name: string }[];
}
export class DataBreadcrumb implements IDataBreadcrumb {
    url: string;
    data: { id: string, name: string }[];

    constructor(dbc: IDataBreadcrumb) {
        this.url = dbc.url;
        this.data = dbc.data;
    }
}
