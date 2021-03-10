import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNumberComponent } from './search-number.component';
import { SharedsModule } from '../../shareds.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Test for SearchNumberComponent is search for table', () => {
  let component: SearchNumberComponent;
  let fixture: ComponentFixture<SearchNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchNumberComponent ],
      imports: [
        SharedsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component for search number', () => {
    expect(component).toBeTruthy();
  });
  it('should put the number to 0', () => {
    component.changesNumber('');
    expect(component.searchNumber).toEqual(0);
  });
  it('should put the number to 5', () => {
    component.changesNumber(5);
    expect(component.searchNumber).toEqual(5);
  });
});
