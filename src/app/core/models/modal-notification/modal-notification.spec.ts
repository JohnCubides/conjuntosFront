import { ModalNotification } from './modal-notification';

const modalNotification: ModalNotification = {
  idModal: 'testComponent',
  header: 'Test for Component',
  showFooter: false,
  message: 'test for component sucessfull',
  actionModal: 'success',
  buttonsFooter: [
    {
      id: 'testYes',
      text: 'Sí',
      class: 'prueba',
      events: [
        {
          name: 'click',
          event: () => {
            console.log('prueba Sí');
          }
        }
      ]
    }
  ]
};
describe('Test for class ModalNotification', () => {
  it('should create an instance', () => {
     expect(new ModalNotification(modalNotification)).toBeTruthy();
  });
});
