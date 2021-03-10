import { User } from './user';

describe('User', () => {
  const user: User = {
    id: 1,
    identificationTypeId: 1,
    identificationNumber: 1234567890,
    names: 'test',
    surnames: 'test',
    email: 'test@test.com',
    phone: 4040268,
    rolesList: null,
    image: undefined,
    userName: 'ttest'
  };
  it('should create an instance', () => {
    //expect(new User()).toBeTruthy();
  });
});
