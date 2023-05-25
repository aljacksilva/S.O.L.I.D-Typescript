import { Order } from './entities/order';
import { Product } from './entities/product';
import { ShoppingCart } from './entities/shopping.cart';
import { Message } from './services/messages';
import { Persistency } from './services/persistency';

const shoppingCart = new ShoppingCart();
const message = new Message();
const persistency = new Persistency();
const order = new Order(shoppingCart, message, persistency);

shoppingCart.addItem(new Product('Short', 21.5));
shoppingCart.addItem(new Product('Pen', 1.19));
shoppingCart.addItem(new Product('Cap', 14.59));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(order.orderstatus);
order.checkout();
console.log(order.orderstatus);
