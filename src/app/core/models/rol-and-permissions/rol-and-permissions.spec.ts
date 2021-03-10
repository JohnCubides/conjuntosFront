import { RolAndPermissions } from './rol-and-permissions';
const json: RolAndPermissions = {
  name: 'Administrador',
  permits: [
    {
      id: 0,
      name: 'Configuracion',
      state: false,
    }
  ]
};
describe('RolAndPermissions', () => {
  it('should create an instance', () => {
    expect(new RolAndPermissions(json)).toBeTruthy();
  });
});
