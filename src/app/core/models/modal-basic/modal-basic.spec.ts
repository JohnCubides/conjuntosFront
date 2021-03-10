import { ModalBasic } from './modal-basic';
const modalBasic: ModalBasic = {
  idModal: 'testComponent',
  header: 'Test for Component',
  showFooter: false
};
describe('ModalBasic', () => {
  it('should create an instance', () => {
    expect(new ModalBasic(modalBasic)).toBeTruthy();
  });
});
