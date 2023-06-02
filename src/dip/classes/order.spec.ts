/* eslint-disable @typescript-eslint/no-empty-function */
import { CartItem } from './interfaces/cart-items';
import { CustomerOrder } from './interfaces/customer-protocol';
import { MessageProtocol } from './interfaces/messagin-protocol';
import { PersistencyProtocol } from './interfaces/persistency-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { Order } from './order';

class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): Readonly<CartItem[]> {
    return [];
  }

  addItem(item: CartItem): void {}

  removeItem(index: number): void {}

  total(): number {
    return 1;
  }

  totalWithDiscount(): number {
    return 2;
  }

  isEmpty(): boolean {
    return false;
  }

  clear(): void {}
}

class MessagingMock implements MessageProtocol {
  sendMessage() {}
}

class PersistencyMock implements PersistencyProtocol {
  saveOrder() {}
}

class CustomerMock implements CustomerOrder {
  getName() {
    return '';
  }

  getIDN() {
    return '';
  }
}

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistencyMock = new PersistencyMock();
  const customerMock = new CustomerMock();
  const sut = new Order(
    shoppingCartMock,
    messagingMock,
    persistencyMock,
    customerMock,
  );

  return { sut, shoppingCartMock, messagingMock, persistencyMock };
};

describe('Order', () => {
  it('Should not checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(true);

    sut.checkout();

    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderstatus).toBe('open');
  });

  it('Should not checkout if cart is not empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(false);

    sut.checkout();

    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderstatus).toBe('closed');
  });

  it('Should send and email to customer', () => {
    const { sut, messagingMock } = createSut();
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage');

    sut.checkout();

    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
  });

  it('Should save order', () => {
    const { sut, persistencyMock } = createSut();
    const persistencyMockSpy = jest.spyOn(persistencyMock, 'saveOrder');

    sut.checkout();

    expect(persistencyMockSpy).toHaveBeenCalledTimes(1);
  });
  it('Should clear cart', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear');

    sut.checkout();

    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });
});
