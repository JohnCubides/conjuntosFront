import { SettingTable } from './setting-table';

describe('SettingTable', () => {
  const setting: SettingTable = {
    id: 'rol',
    name: 'Rol'
  };
  it('should create an instance', () => {
    expect(new SettingTable(setting)).toBeTruthy();
  });
});
