/*
Interface segregation principle
The clients not must is forced is depends of types, interfaces or menbers abstract that no use.
*/

import { EnterpriseCustomer } from './classes/customer';
import {
  FiftyPercentDiscount,
  NoDiscount,
  TenPercentDiscount,
} from './classes/discount';
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
const enterpriseCustomer = new EnterpriseCustomer('Nike', '111.11111-11.11111');
const order = new Order(shoppingCart, message, persistency, enterpriseCustomer);

shoppingCart.addItem(new Product('Short', 21.5));
shoppingCart.addItem(new Product('Pen', 1.19));
shoppingCart.addItem(new Product('Cap', 14.59));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderstatus);
order.checkout();
console.log(order.orderstatus);
