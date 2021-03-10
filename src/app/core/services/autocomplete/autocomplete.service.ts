import { Injectable, EventEmitter } from '@angular/core';
import { Autocomplete } from '../../models/autocomplete/autocomplete';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {
  private event: { [key: string]: Autocomplete } = {};
  private onAutocomplete: EventEmitter<any> = new EventEmitter<any>();


  public AutocompleteTemplate(data: Autocomplete): void {
    this.event[data.id] = data;
    this.onAutocomplete.emit({ event: this.event, id: data.id });
  }

  get OnAutocomplete() {
    return this.onAutocomplete;
  }
  constructor() { }
}
