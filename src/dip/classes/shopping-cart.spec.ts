import { Discount } from './discount';
import { CartItem } from './interfaces/cart-items';
import { ShoppingCart } from './shopping-cart';

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);

  return { sut, discountMock };
};

const createDiscountMock = () => {
  class DiscountMock extends Discount {}

  return new DiscountMock();
};

const createCartItem = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number) {}
  }

  return new CartItemMock(name, price);
};

const createSutWithProducts = () => {
  const { sut, discountMock } = createSut();
  const cartItem1 = createCartItem('TV', 4000);
  const cartItem2 = createCartItem('Pen', 2.5);

  sut.addItem(cartItem1);
  sut.addItem(cartItem2);

  return { sut, discountMock };
};

describe('ShoppingCart', () => {
  it('should be an empty cart when no product is added', () => {
    const { sut } = createSut();

    expect(sut.isEmpty()).toBe(true);
  });

  it('should have two cart items', () => {
    const { sut } = createSutWithProducts();

    expect(sut.items.length).toBe(2);
  });

  it('should test total and totalWithDiscount', () => {
    const { sut } = createSutWithProducts();

    expect(sut.total()).toBe(4002.5);
    expect(sut.totalWithDiscount()).toBe(4002.5);
  });

  it('should add products and clear cart', () => {
    const { sut } = createSutWithProducts();

    expect(sut.total()).toBe(4002.5);

    sut.clear();

    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should remove products', () => {
    const { sut } = createSutWithProducts();

    expect(sut.items.length).toBe(2);

    sut.removeItem(1);

    expect(sut.items.length).toBe(1);

    sut.removeItem(0);

    expect(sut.isEmpty()).toBe(true);
  });

  it('should call discount.calculate once when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');

    sut.totalWithDiscount();

    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call discount.calculate with total price when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');

    sut.totalWithDiscount();

    expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
  });
});
