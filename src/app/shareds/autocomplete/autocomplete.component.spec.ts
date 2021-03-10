import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteService } from 'src/app/core/services/autocomplete/autocomplete.service';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;
  let autocompleteService: AutocompleteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    autocompleteService = TestBed.inject(AutocompleteService);
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should validate that you add the data to the list', () => {
    component.addData('test');
    expect(component.datas.length).toBeGreaterThanOrEqual(1);
  });
  it('Should validate focus status', () => {
    component.focusData = false;
    component.autocomplete = { id: 'rol', data: [{ row: 'home', class: 'home'}] };
    component.sendDataComplete();
    expect(component.focusData).toBeTruthy();
  });
});
