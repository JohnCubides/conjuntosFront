/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('dshould validate when a change is made in the filter, do not modify the form', () => {
    component.changesFilter();
    expect(component.searchForm.get('search').value).toEqual('');
  });
  it('should validate when a change is made to the filter if you modify the form', () => {
    component.changesFilter('test');
    expect(component.searchForm.get('search').value).toEqual('test');
  });
  it('should change focusFilter status', () => {
    component.focusFilter = true;
    component.searchForm.patchValue({
      search: ''
    });
    component.focusViewData();
    expect(component.focusFilter).toBeTrue();
  });
  it('shouldnt change focusFilter status', () => {
    component.focusFilter = true;
    component.searchForm.patchValue({
      search: 'test'
    });
    component.focusViewData();
    expect(component.focusFilter).toBeTrue();
  });
  it('should modify the translation event for the search', () => {
    component.traslation = false;
    component.filterAction = false;
    component.searchForm.patchValue({
      search: 'test'
    });
    component.activateTraslation();
    expect(component.filterAction).toBeTrue();
  });
  it('should modify the translation event for the search form action', () => {
    component.traslation = true;
    component.filterAction = false;
    component.searchForm.patchValue({
      search: 'test'
    });
    component.activateTraslation();
    expect(component.filterAction).toBeFalse();
  });
});*/
