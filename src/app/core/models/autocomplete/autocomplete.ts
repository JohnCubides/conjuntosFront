
export class IAutocomplete {
    id: string | undefined;
    text?: string | undefined;
    data: { row: string, class: string }[];
}
export class Autocomplete implements IAutocomplete {
    id: string | undefined;
    text?: string | undefined;
    data: { row: string, class: string }[];

    constructor(filter: IAutocomplete) {
        this.id = filter.id;
        this.text = filter.text;
        this.data = filter.data;
    }
}
