import { AbstractTable } from './abstract-table';
import { Injector, Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ApiService } from 'src/app/core/https/http.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableItem } from '../../table-item/table-item';
import { StoreModule } from '@ngrx/store';
@Component({
  selector: 'app-tested-component',
  template:
    `<div #rootMenu>
    <input id="txt" class="input btn-primary" type="text" >
    <button id="btn" class="btn btn-primary" ></button>
    </div>`
})
export class TestedModalComponent extends AbstractTable {
  constructor(injector: Injector) {
    super(injector);
  }
}
describe('AbstractTable', () => {

  let component: TestedModalComponent;
  let fixture: ComponentFixture<TestedModalComponent>;
  const btnsActionsRow2: TableItem = {
    id: 'btnActions',
    text: 'Acciones',
    items: [
        {
            id: 'btnView',
            type: 'button',
            svgIconUrl: 'assets/icons/view.svg'
        },
        {
            id: 'btnEdit',
            type: 'button',
            svgIconUrl: 'assets/icons/edit.svg'
        },
        {
            id: 'btnDelete',
            type: 'button',
            svgIconUrl: 'assets/icons/delete.svg'
        },
        {
            id: 'chkStatus',
            type: 'checkbox'
        }
    ]
};
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      declarations: [TestedModalComponent],
      providers: [
        ApiService
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(TestedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create it component extends AbstractTable', () => {
    expect(component).toBeTruthy();
  });
  it('should show activate show modal footer', () => {
    component.btnsActionsRow = btnsActionsRow2;
    expect(component.searchAction({id: 'btnView0'}).id).toEqual(0);
  });
  it('should show date send endpoint', () => {
    expect(component.viewDate('2020-04-28T20:55:06.809068')).toEqual('28/04/2020');
  });
});
