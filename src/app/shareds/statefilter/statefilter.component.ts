import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statefilter',
  templateUrl: './statefilter.component.html',
  styleUrls: ['./statefilter.component.scss']
})
export class StatefilterComponent implements OnInit {
  public radioBtns: { id: string, text: string, group: string, value: number, checked: boolean }[] = [
    { id: 'active', text: 'Activa', group: 'state', value: 0, checked: true },
    { id: 'inactive', text: 'Inactiva', group: 'state', value: 1, checked: false },
    { id: 'both', text: 'Ambos', group: 'state', value: 2, checked: false }
  ];
  public borderRadio = '';
  public checked = 'active';
  constructor() { }

  ngOnInit(): void {
  }

  onItemChange(value: number) {
    this.borderRadio = (value === 2) ? 'both' : '';
  }

  public deleteBorder(value: number): string {
    return ((value === 0) ? 'border_rigth' : '') + ((value === this.radioBtns[this.radioBtns.length - 1].value) ? 'border_left' : '');
  }

}
