import { AbstractModal } from './abstract-modal';
import { Injector, Component } from '@angular/core';
import { inject, TestBed, ComponentFixture } from '@angular/core/testing';
import { ApiService } from 'src/app/core/https/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
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
export class TestedModalComponent extends AbstractModal {
  constructor(injector: Injector) {
    super(injector);
  }
}

describe('AbstractModal', () => {
  let component: TestedModalComponent;
  let fixture: ComponentFixture<TestedModalComponent>;
  let spy: any;
  const btnYesNo: TableItem[] = [
    {
        id: 'btnYes',
        text: 'Sí',
        class: 'yes',
        events: []
    },
    {
        id: 'btnNo',
        text: 'No',
        class: 'noChanges',
        events: []
    }
];
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
  it('should create it component extends abstractModal', () => {
    expect(component).toBeTruthy();
  });
  it('should show activate show modal footer', () => {
    component.settingModal('mesagge', 'error', btnYesNo);
    expect(component.modal.showFooter).toBeTruthy();
  });
});
