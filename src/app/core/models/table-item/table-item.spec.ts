import { TableItem } from './table-item';


describe('Menu-Item', () => {
  it('should create an instance', () => {
    const item: TableItem = new TableItem({
      id: 'prueba_1',
      class: 'prueba_1',
      text: 'Prueba 1',
      icon: 'prueba_1',
      permissionName: 'prueba_1',
      events: [
        {
          name: 'click', event: () => {
            console.log('prueba 1');
          }
        }
      ],
    });
    expect(new TableItem(item)).toBeTruthy();
  });
});
