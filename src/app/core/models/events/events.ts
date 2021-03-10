export interface IEvents {
  name: 'blur' | 'change' |'click' | 'focus' | 'keyup' | 'keypress' | 'mouseover';
  event: () => void;
}
export class Events implements IEvents {
  name: 'blur' | 'change' |'click' | 'focus' | 'keyup' | 'keypress' | 'mouseover';
  event: () => void;

  constructor(event: IEvents) {
    this.name = event.name;
    this.event = event.event;
  }
}
