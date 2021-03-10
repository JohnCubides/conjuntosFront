import { Injectable, EventEmitter } from '@angular/core';
import { BaseFilter } from '../../models/filter/base-filter';

@Injectable({
  providedIn: 'root'
})
export class BaseFilterService {

  private onFilter: EventEmitter<BaseFilter> = new EventEmitter<BaseFilter>();

  constructor() { }

  public FilterTemplate(data: BaseFilter): void {
      this.onFilter.emit(data);
  }

  get OnFilter() {
    return this.onFilter;
  }
}

