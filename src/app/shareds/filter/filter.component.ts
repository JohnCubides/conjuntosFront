import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BaseFilterService } from 'src/app/core/services/filter/base-filter.service';
import { BaseFilter } from 'src/app/core/models/filter/base-filter';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  public emptyFilter = false;
  private objectData: any;
  public filter: BaseFilter;
  public searchForm: FormGroup;
  public filterAction = false;
  public focusFilter = false;
  public traslation = true;
  @Output() public responseFilter = new EventEmitter<any>();
  constructor(private filterService: BaseFilterService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
    this.objectData = this.filterService.OnFilter.subscribe((result: BaseFilter) => {
      this.filter = result;
      this.traslation = (result.traslation === undefined || result.traslation) && this.searchForm.get('search').value === '';
    });
  }

  ngOnDestroy() {
    if (this.objectData) {
      this.objectData.unsubscribe();
    }
  }
  public focusViewData(): void {
    if (!this.focusFilter || this.searchForm.get('search').value === '') {
      this.focusFilter = true;
    }
  }
  public changesFilter(event?: any, data?: any): void {
    const enter = (event &&  event.keyCode === 13);
    if (data) {
      this.searchForm.patchValue({
        search: data
      });
    }
    this.focusViewData();
    this.focusFilter = data ? false : this.focusFilter;
    console.log(data, this.searchForm.get('search').value);
    const test = {
      search: this.searchForm.get('search').value,
      id: (data || enter) ? undefined : 'General'
    };
    this.responseFilter.emit(test);
  }

  public activateTraslation() {
    if (!this.traslation) {
        this.searchForm.patchValue({
        search: ''
      });

        const test = {
          search: this.searchForm.get('search').value,
          id: 'General'
        };
        this.responseFilter.emit(test);
    }
    this.traslation = false;

    // this.filterAction = !this.traslation ? !this.filterAction : this.filterAction;
    // if (this.filterAction) {
    //   this.searchForm.patchValue({
    //     search: ''
    //   });
    //   this.searchForm.controls.search.disable();
    // } else {
    //   this.searchForm.controls.search.enable();
    // }
    // this.traslation = false;
  }

  public styleTest(): string {
    return this.traslation ? 'icon_search' : 'icon_close';
    // return  this.traslation ? 'icon_search' : (this.filterAction ? 'icon_close' : 'icon_filter');
  }
}
