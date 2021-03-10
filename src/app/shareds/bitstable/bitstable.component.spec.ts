import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitstableComponent } from './bitstable.component';
import { TableItem } from 'src/app/core/models/table-item/table-item';
import { SharedsModule } from '../shareds.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BitstableService } from 'src/app/core/services/bitstable/bitstable.service';
import { Table } from 'src/app/core/models/table/table';

describe('Test for BitstableComponent', () => {
  let component: BitstableComponent;
  let fixture: ComponentFixture<BitstableComponent>;
  let bitsTableService: BitstableService;
  const buttons: TableItem = {
        id: 'btnActions',
        text: 'Acciones',
        items: [
          {
            id: 'consult',
            type: 'button',
            svgIconUrl: 'assets/icons/view.svg'
          },
          {
            id: 'edit',
            type: 'button',
            svgIconUrl: 'assets/icons/edit.svg'
          },
          {
            id: 'delete',
            type: 'button',
            positionIcon: 'right',
            svgIconUrl: 'assets/icons/delete.svg'
          },
          {
            id: 'state',
            type: 'checkbox'
          }
        ]
  };
  const table: Table = {
    data: [
      {
        id: 0,
        Rol: 'Admin',
        state: true
      },
      {
        id: 1,
        Rol: 'Admin1',
        state: false
      },
      {
        id: 2,
        Rol: 'Admin2',
        state: true
      }
    ],
    settingsTitle: {
      id: 'rol',
      name: 'Admin rol',
      create: {
        id: 'btnCreate',
        route: '/',
        events: [
          {
            name: 'click',
            event: () => {
              console.log('test');
            }
          }
        ]
      }
    },
    buttonsAction: [buttons],
    paginator: {
      page: 1,
      quantityToShow: 4,
      totalData: 40,
      totalPages: 10
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BitstableComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitstableComponent);
    bitsTableService = TestBed.inject(BitstableService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component with buttons', () => {
    expect(component).toBeTruthy();
  });

  it('should init paginator', () => {
      bitsTableService.TableTemplate(table);
      expect(component.paginator).not.toBeUndefined();
  });

  it('should not init paginator', () => {
    const table2: Table = { data: table.data, settingsTitle: table.settingsTitle };
    bitsTableService.TableTemplate(table2);
    expect(component.paginator).toBeUndefined();
  });

  // it('should init settingsTitle without create', () => {
  //   const table2: Table = { data: table.data, settingsTitle: { id: table.settingsTitle.id, name: table.settingsTitle.name } };
  //   bitsTableService.TableTemplate(table2);
  //   expect(component.paginator).toBeUndefined();
  // });

  // it('should init settingsTitle with create and route', () => {
  //   const table2: Table = {
  //     data: table.data,
  //     settingsTitle: {
  //       id: table.settingsTitle.id,
  //       name: table.settingsTitle.name,
  //       create: {
  //         id: table.settingsTitle.create.id
  //       }
  //     }
  //   };
  //   bitsTableService.TableTemplate(table2);
  //   expect(component.routeElement(table.settingsTitle.create)).toEqual('/');
  // });

  // it('should init settingsTitle with create without route', () => {
  //   bitsTableService.TableTemplate(table);
  //   expect(component.routeElement(table.settingsTitle.create)).toEqual(table.settingsTitle.create.route);
  // });

  // it('should select button', () => {
  //   component.resultActions('consult0', undefined);
  //   expect(true).toBeTrue();
  // });

  // it('should select checkbox', () => {
  //   component.resultActions('consult1', true);
  //   expect(true).toBeTrue();
  // });

  // xit('Should change pager quantityToShow to 4', () => {
  //   bitsTableService.TableTemplate(table);
  //   component.changePages({ searchNumber: 4 });
  //   expect(component.paginator.quantityToShow).toEqual(4);
  // });

  /*it('Should change pager quantityToShow to 1', () => {
    bitsTableService.TableTemplate(table);
    component.changePages({ searchNumber: '' });
    expect(component.paginator.quantityToShow).toEqual(1);
  });

  it('Should change pager page to 2', () => {
    bitsTableService.TableTemplate(table);
    component.changePages({ page: 2 });
    expect(component.paginator.page).toEqual(2);
  });

  it('Should change pager page to 3', () => {
    bitsTableService.TableTemplate(table);
    component.changePages({ searchNumber: 3 }, true);
    expect(component.paginator.page).toEqual(3);
  });*/
});
