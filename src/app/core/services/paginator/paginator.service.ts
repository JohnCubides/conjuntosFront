import { EventEmitter, Injectable } from '@angular/core';
import { Paginator } from '../../models/paginator/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  private onPaginator: EventEmitter<Paginator> = new EventEmitter<Paginator>();

  constructor() { }

  public PaginatorTemplate(data: Paginator): void {
    this.onPaginator.emit(data);
  }

  get OnPaginator() {
    return this.onPaginator;
  }
}
