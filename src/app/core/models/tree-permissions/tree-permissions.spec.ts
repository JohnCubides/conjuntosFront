import { TreePermissions } from './tree-permissions';

const json: TreePermissions = {
  id: 0,
  name: 'Configuracion',
  state: false,
};

const json2: TreePermissions = {
  id: 0,
  name: 'Configuracion'
};
describe('TreePermissions', () => {
  it('should create an instance', () => {
    expect(new TreePermissions(json)).toBeTruthy();
  });
  it('should create an instance', () => {
    expect(new TreePermissions(json2)).toBeTruthy();
  });
});
