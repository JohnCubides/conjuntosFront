import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bits-icon',
  templateUrl: './bitsicon.component.html',
  styleUrls: ['./bitsicon.component.scss']
})
export class BitsiconComponent implements OnInit {

  @Input() public element: any;
  constructor() { }

  ngOnInit() {
  }

}
