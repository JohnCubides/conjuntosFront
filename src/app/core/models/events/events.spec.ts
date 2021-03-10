import { Events, IEvents } from './events';

describe('Events', () => {
  const events: IEvents = {
    name: 'click',
    event: () => {
      console.log('click');
    }
  };
  it('should create an instance', () => {
    expect(new Events(events)).toBeTruthy();
  });
});
