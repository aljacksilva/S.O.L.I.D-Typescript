import { Message } from '../services/messages';
import { Persistency } from '../services/persistency';
import { CustomerOrder } from './interfaces/customer-protocol';
import { OrderStatus } from './interfaces/order-status';
import { ShoppingCart } from './shopping.cart';

export class Order {
  private _oderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCart,
    private readonly message: Message,
    private readonly persistency: Persistency,
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
