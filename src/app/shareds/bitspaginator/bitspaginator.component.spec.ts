import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitspaginatorComponent } from './bitspaginator.component';
import { SharedsModule } from '../shareds.module';
import { PaginatorService } from 'src/app/core/services/paginator/paginator.service';
import { Paginator } from 'src/app/core/models/paginator/paginator';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BitspaginatorComponent', () => {
  let component: BitspaginatorComponent;
  let fixture: ComponentFixture<BitspaginatorComponent>;
  let paginatorService: PaginatorService;
  const data: Paginator = { page: 1, quantityToShow: 4, totalPages: 2, totalData: 8 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitspaginatorComponent ],
      imports: [
        HttpClientTestingModule,
        SharedsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitspaginatorComponent);
    paginatorService = TestBed.inject(PaginatorService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Debería cargar correctamente la lista de botones', () => {
    paginatorService.PaginatorTemplate(data);
    expect(component.listButton).not.toBeUndefined();
  });
  it('Debería cargar correctamente la lista desde la opcion 5', () => {
    const data2 = { page: 5, quantityToShow: 1, totalPages: 11, totalData: 11 };
    let page = 2;
    paginatorService.PaginatorTemplate(data2);
    component.listButton.forEach(btn => {
      if (btn.text === '5') {
        page = 5;
      }
    });
    expect(page).toBeGreaterThanOrEqual(5);
  });
  it('Debería cargar correctamente la lista desde la opcion 3', () => {
    const data2 = { page: 3, quantityToShow: 1, totalPages: 11, totalData: 11 };
    let page = 2;
    paginatorService.PaginatorTemplate(data2);
    component.listButton.forEach(btn => {
      if (btn.text === '4') {
        page = 4;
      }
    });
    expect(page).toBeGreaterThanOrEqual(4);
  });
  it('Debería cargar correctamente la lista desde la opcion 3', () => {
    const data2 = { page: 11, quantityToShow: 1, totalPages: 11, totalData: 11 };
    let page = 2;
    paginatorService.PaginatorTemplate(data2);
    component.listButton.forEach(btn => {
      if (btn.text === '10') {
        page = 10;
      }
    });
    expect(page).toBeGreaterThanOrEqual(10);
  });
});
