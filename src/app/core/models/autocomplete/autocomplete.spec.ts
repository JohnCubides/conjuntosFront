import { Autocomplete } from './autocomplete';

describe('Autocomplete', () => {
  it('should create an instance', () => {
    expect(new Autocomplete({id: 'name', data: [{row: 'Hi', class: 'home'}]})).toBeTruthy();
  });
});
