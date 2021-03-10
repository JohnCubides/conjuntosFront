import { EventEmitter, Injectable } from '@angular/core';
import { Table } from '../../models/table/table';

@Injectable({
  providedIn: 'root'
})
export class BitstableService {

  private onTable: EventEmitter<Table> = new EventEmitter<Table>();

  constructor() { }

  public TableTemplate(data: Table): void {
      this.onTable.emit(data);
  }

  get OnTable() {
    return this.onTable;
  }
}

