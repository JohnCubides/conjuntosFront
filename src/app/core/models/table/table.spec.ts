import { Table } from './table';

describe('Table', () => {
  const table: Table = {
    data: [
      { id: '1', name: 'test' }
    ],
    settingsTitle: {
      id: 'admin',
      name: 'Administradción'
    },
    buttonsAction: [
      {
        id: 'btnAction',
        text: 'acciones',
        items: [
          {
            id: 'consult',
            type: 'button',
            svgIconUrl: 'assets/icons/view.svg'
          },
          {
            id: 'edit',
            type: 'button',
            svgIconUrl: 'assets/icons/edit.svg'
          },
          {
            id: 'delete',
            type: 'button',
            svgIconUrl: 'assets/icons/delete.svg'
          },
          {
            id: 'state',
            type: 'checkbox'
          }
        ]
      }
    ],
    paginator: { page: 1, quantityToShow: 4, totalPages: 2, totalData: 8 }
  };
  it('should create an instance', () => {
    expect(new Table(table)).toBeTruthy();
  });
});
