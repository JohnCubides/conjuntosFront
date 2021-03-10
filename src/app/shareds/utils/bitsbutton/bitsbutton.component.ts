import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bits-button',
  templateUrl: './bitsbutton.component.html',
  styleUrls: ['./bitsbutton.component.scss']
})
export class BitsbuttonComponent implements OnInit {
  @Input() public element: any;
  constructor() { }

  ngOnInit() {}

}
