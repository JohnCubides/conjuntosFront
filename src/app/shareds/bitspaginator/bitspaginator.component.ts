import { Component, Output, EventEmitter, ViewChild, ElementRef, OnInit, Injector } from '@angular/core';
import { IPaginator, Paginator } from '../../core/models/paginator/paginator';
import { PaginatorService } from 'src/app/core/services/paginator/paginator.service';
import { TableItem } from 'src/app/core/models/table-item/table-item';
import { EventsForms } from 'src/app/core/models/events-forms/events-forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-bitspaginator',
  templateUrl: './bitspaginator.component.html',
  styleUrls: ['./bitspaginator.component.scss'],
})
export class BitspaginatorComponent extends EventsForms implements OnInit {

  private paginatorInput: IPaginator;
  @Output() getPagination = new EventEmitter();
  @ViewChild('pagination') pagination: ElementRef;
  public listButton: TableItem[] = [];

  constructor(injector: Injector,
              private paginatorService: PaginatorService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    super(injector);
  }

  ngOnInit(): void {
    const dom1 = this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/triangle.svg`);
    this.matIconRegistry.addSvgIcon('back', dom1);
    const dom2 = this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/triangle.svg`);
    this.matIconRegistry.addSvgIcon('next', dom2);
    this.paginatorService.OnPaginator.subscribe((result: Paginator) => {
      this.paginatorInput = result;
      this.initPaginator();
    });
  }

  private initPaginator(): void {
    this.listButton = [];
    if (this.paginatorInput.page !== 1) {
      this.listButton.push(this.btnItem('back', 0, this.paginatorInput.page - 1, 'back'));
    }
    for (let i = 1; i <= this.paginatorInput.totalPages; i++) {
      this.pages(i);
    }
    if (this.paginatorInput.page !== this.paginatorInput.totalPages) {
      this.listButton.push(this.btnItem('next', 0, this.paginatorInput.page + 1, 'next'));
    }
    this.events(this.listButton, this.pagination);
  }

  private pages(pages: number) {
    const btnNumber = this.btnItem('page' + pages, pages, pages);
    if (this.paginatorInput.totalPages < 6) {
      this.listButton.push(btnNumber);
    } else {
      this.paginatorComplex(pages, btnNumber);
    }
  }

  private paginatorComplex(pages: number, btnNumber: TableItem) {
    if ((this.paginatorInput.page < 4 && pages > 0 && pages < 4) || (this.paginatorInput.page === 3 && pages === 4)) {
      this.listButton.push(btnNumber);
      if ((this.paginatorInput.page < 3 && pages === 3) || (this.paginatorInput.page === 3 && pages === 4)) {
        this.listButton.push(this.btnItem('pagePoint' + pages, 0, this.paginatorInput.page + 2));
      }
    } else if ((this.paginatorInput.page > 3 && pages === 1) || (this.paginatorInput.totalPages === pages)) {
      this.numberInitFinal(btnNumber);
    } else if ((pages >= (this.paginatorInput.page - 1)) && (pages <= (this.paginatorInput.page + 1)) && this.paginatorInput.page > 3) {
      this.numberIntermediate(pages, btnNumber);
    }
  }

  private numberInitFinal(btnNumber: TableItem) {
    const btn = Object.assign({}, btnNumber);
    btn.class = (btn.class ? btn.class : '') + ' hidemobile' ;
    this.listButton.push(btn);
  }

  private numberIntermediate(pages: number, btnNumber: TableItem) {
    if (pages === (this.paginatorInput.page - 1)) {
      this.listButton.push(this.btnItem('pagePoint' + pages, 0, this.paginatorInput.page - 2));
    }
    this.listButton.push(btnNumber);
    if (pages === (this.paginatorInput.page + 1) && ((this.paginatorInput.page + 1) !== this.paginatorInput.totalPages - 1)) {
      this.listButton.push(this.btnItem('pagePoint' + pages, 0, this.paginatorInput.page + 2));
    }
  }

  private btnItem(idItem: string, pages: number, changePages: number, icon?: string): TableItem {
    const btnPaginator: TableItem = {
      id: idItem,
      text: (icon ? undefined : (pages === 0 ? '...' : pages.toString())),
      type: (icon ? 'button' : 'text'),
      class: (this.paginatorInput.page === pages && !icon ? 'active' : (pages === 0 && !icon ? 'points' : icon )) ,
      svgIcon: icon ? icon : undefined,
      events: [
        {
          name: 'click',
          event: () => {
            this.paginatorInput.page = changePages;
            this.getPagination.emit(this.paginatorInput);
          }
        }
      ]
    };
    return btnPaginator;
  }
}

