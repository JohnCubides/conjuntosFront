import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AutocompleteService } from 'src/app/core/services/autocomplete/autocomplete.service';
import { Autocomplete } from 'src/app/core/models/autocomplete/autocomplete';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit, OnDestroy {
  private objectData: any;
  public inputForm: FormGroup;
  public autocomplet: { shortword: string, description: string, class: string }[];
  public datas: string[] = [];
  public autocomplete: Autocomplete;
  public focusData = false;
  @Input() public dataId: string;
  @Output() public responseAutocomplete = new EventEmitter<any>();
  constructor(private autocompleteService: AutocompleteService) { }

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      data: new FormControl(''),
    });
    this.objectData = this.autocompleteService.OnAutocomplete.subscribe((result: any) => {
      this.autocomplete = result.event[this.dataId];
      if (this.autocomplete && this.autocomplete.data) {
        this.autocomplet = [];
        let constClass = 1;
        this.autocomplete.data.forEach(d => {
          this.autocomplet.push({ shortword: this.shortword(d.row), description: d.row, class: `color_${constClass}`});
          constClass++;
          if (constClass > 4) {
            constClass = 1;
          }
        });
      }
    });
  }
  ngOnDestroy(): void {
    if (this.objectData) {
      this.objectData.unsubscribe();
    }
  }
  private shortword(sw: string): string {
    const regex = /([\wáéíóúñÁÉÍÓÚÑ]{1})([\wáéíóúñáéíóúñÁÉÍÓÚÑ-]{1,})((([\ ]{1,})([\wáéíóúñÁÉÍÓÚÑ]{1})([\wáéíóúñáéíóúñÁÉÍÓÚÑ-]{1,}))*)?/gm;
    const regex2 = /\s+/g;
    const subst = `$1$6`;
    const result1 = sw.replace(regex, subst).trim().toUpperCase();
    const result2 = result1.replace(regex2, '');
    return result2;
  }
  public addData(data?: string): void {
    this.datas.push(data);
    this.inputForm.patchValue({
      data: ''
    });
    this.focusData = false;
    this.autocomplet = null;
  }
  public sendDataComplete() {
    this.focusData = true;
    if (this.inputForm.get('data').value) {
      this.responseAutocomplete.emit({ search: this.inputForm.get('data').value, id: this.autocomplete.id, data: this.datas });
    }
  }
  public deleteSearch(id: number) {
    this.datas.splice(id, 1);
  }
}
