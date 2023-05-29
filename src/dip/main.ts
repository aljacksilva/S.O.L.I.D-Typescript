/*
Depency inversion principle
Module of high level not must depend of modules of low level. Both must depend of abstractions.
depend of abstractions, not of implements.
Abstractions not must depend of features. Features of depend of abstractions.
*/

import { EnterpriseCustomer } from './classes/customer';
import {
  FiftyPercentDiscount,
  NoDiscount,
  TenPercentDiscount,
} from './classes/discount';
import { MessageProtocol } from './classes/interfaces/messagin-protocol';
import { Order } from './classes/order';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping.cart';
import { Message } from './services/messages';
import { Persistency } from './services/persistency';

const fiftyPercentDiscount = new FiftyPercentDiscount();
const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const message = new Message();
const persistency = new Persistency();
// const individualCustomer = new IndividualCustomer(
//   'Jack',
//   'Almeida',
//   '111.111.111-11',
// );

class MessagingMock implements MessageProtocol {
  sendMessage(): void {
    console.log('The message was sent for Mock!');
  }
}

const messagingMock = new MessagingMock();

const enterpriseCustomer = new EnterpriseCustomer('Nike', '111.11111-11.11111');
const order = new Order(
  shoppingCart,
  messagingMock,
  persistency,
  enterpriseCustomer,
);

shoppingCart.addItem(new Product('Short', 21.5));
shoppingCart.addItem(new Product('Pen', 1.19));
shoppingCart.addItem(new Product('Cap', 14.59));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderstatus);
order.checkout();
console.log(order.orderstatus);
