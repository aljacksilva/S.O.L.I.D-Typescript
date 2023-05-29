import { CustomerOrder } from './interfaces/customer-protocol';
import { MessageProtocol } from './interfaces/messagin-protocol';
import { OrderStatus } from './interfaces/order-status';
import { PersistencyProtocol } from './interfaces/persistency-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';

export class Order {
  private _oderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly message: MessageProtocol,
    private readonly persistency: PersistencyProtocol,
    private readonly customer: CustomerOrder,
  ) {}

  get orderstatus(): OrderStatus {
    return this._oderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('Your cart is empty!');
      return;
    }

    this._oderStatus = 'closed';
    this.message.sendMessage(
      `Your order with ${this.cart.totalWithDiscount()} gone received!`,
    );
    this.persistency.saveOrder();
    this.cart.clear();

    console.log(
      'O client is: ',
      this.customer.getName(),
      this.customer.getIDN(),
    );
  }
}
