export class IBaseFilter {
    id: string | undefined;
    data: { row: string, class: string}[];
    placeholder?: string | undefined;
    traslation?: boolean | undefined;
}
export class BaseFilter implements IBaseFilter {
    id: string | undefined;
    data: { row: string, class: string}[];
    placeholder?: string | undefined;
    traslation?: boolean | undefined;

    constructor(filter: IBaseFilter) {
        this.data = filter.data;
        this.id = filter.id;
        this.placeholder = filter.placeholder;
        this.traslation = filter.traslation;
    }
}
