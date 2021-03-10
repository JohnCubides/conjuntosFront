import {
  Component,
  EventEmitter,
  AfterViewInit,
  Output,
  Input
} from '@angular/core';

@Component({
  selector: 'app-toggle-swich',
  templateUrl: './toggle-swich.component.html',
  styleUrls: ['./toggle-swich.component.scss']
})
export class ToggleSwichComponent implements AfterViewInit {

  @Input() public stateNode = false;
  @Input() public disabled = false;
  @Input() public idNodeFather: string;
  @Output() public resultToggleSwich = new EventEmitter<boolean>();

  constructor() { }

  ngAfterViewInit(): void {
    const inner: any = document.getElementById(`inner-${this.idNodeFather}`);
    const value = (!this.stateNode) ? 'on' : 'off';
    inner.classList.add(`onoffswitch-inner-${value}`);
  }

  public changeStateCheckbox() {
    const isChecked: any = document.getElementById(`chk--switch-${this.idNodeFather}`);
    const inner = document.getElementById(`inner-${this.idNodeFather}`);
    this.stateNode = isChecked.checked;
    if (inner.classList.contains('onoffswitch-inner-on')) {
      inner.classList.remove('onoffswitch-inner-on');
      inner.classList.add('onoffswitch-inner-off');
    } else {
      inner.classList.remove('onoffswitch-inner-off');
      inner.classList.add('onoffswitch-inner-on');
    }
    this.resultToggleSwich.emit(this.stateNode);
  }
}
