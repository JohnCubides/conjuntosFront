import { Paginator } from './paginator';


describe('Paginator', () => {
  it('should create an instance', () => {
    const item: Paginator = new Paginator({
      totalData: 50,
      totalPages: 8,
      page: 1,
      quantityToShow: 4
    });
    expect(new Paginator(item)).toBeTruthy();
  });
});
