/*
Liskov substitution principle
If ø(x) is one property demonstrate of objects x of type T. Then ø(y) must is true for objects y of type S where S is one subtype of T.

more simple: Subtypes must is repleacable for yours types of base.

example: If my program wait one Animal, something of type Dog (who inherits of Animal) of serve with any other Animal.
*/

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
const order = new Order(shoppingCart, message, persistency);

shoppingCart.addItem(new Product('Short', 21.5));
shoppingCart.addItem(new Product('Pen', 1.19));
shoppingCart.addItem(new Product('Cap', 14.59));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderstatus);
order.checkout();
console.log(order.orderstatus);
