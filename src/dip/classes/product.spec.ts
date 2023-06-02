import { Product } from './product';

const creatSut = (name: string, price: number): Product => {
  return new Product(name, price);
};

describe('Persistency', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return undefined', () => {
    const sut = creatSut('Short', 52.6);

    expect(sut).toHaveProperty('name', 'Short');
    expect(sut.price).toBeCloseTo(52.6);
  });
});
