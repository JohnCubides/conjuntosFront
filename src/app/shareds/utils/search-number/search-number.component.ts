import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-search-number',
  templateUrl: './search-number.component.html',
  styleUrls: ['./search-number.component.scss']
})
export class SearchNumberComponent implements OnInit {
  @Input() public searchNumber: number;
  @Output() public responseSearchNumber = new EventEmitter<any>();
  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const dom = this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/enter.svg`);
    this.matIconRegistry.addSvgIcon('enter', dom);
  }

  changesNumber(quatity: any): void {
    if (quatity === '') {
      this.searchNumber = 0;
    } else {
      this.searchNumber = +quatity;
    }
    this.responseSearchNumber.emit({ searchNumber: this.searchNumber });
  }
}
