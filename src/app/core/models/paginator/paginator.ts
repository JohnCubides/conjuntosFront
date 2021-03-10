import { TableItem } from '../table-item/table-item';

export interface IPaginator {
  page: number;
  quantityToShow: number;
  totalPages?: number;
  totalData?: number;
}


export class Paginator implements IPaginator {
    page: number;
    quantityToShow: number;
    totalPages?: number;
    totalData?: number;
    constructor(page: IPaginator) {
        this.page = page.page;
        this.quantityToShow = page.quantityToShow;
        this.totalPages = page.totalPages;
        this.totalData = page.totalData;
    }
}
