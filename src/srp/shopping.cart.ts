type CartItem = { name: string; price: number };
type OrderStatus = 'open' | 'closed';

export class ShoppingCart {
  private readonly _items: CartItem[] = [];
  private _oderStatus: OrderStatus = 'open';

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  get orderstatus(): OrderStatus {
    return this._oderStatus;
  }

  total(): number {
    return +this._items
      .reduce((total, next) => total + next.price, 0)
      .toFixed(2);
  }

  checkout(): void {
    if (this.isEmpty()) {
      console.log('Your cart is empty!');
      return;
    }

    this._oderStatus = 'closed';
    this.sendMessage(`Your order with ${this.total()} gone received!`);
    this.saveOrder();
    this.clear();
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  sendMessage(msg: string): void {
    console.log('Message sent:', msg);
  }

  saveOrder(): void {
    console.log('Order saved successfully...');
  }

  clear(): void {
    this._items.length = 0;
  }
}

const shoppingCart = new ShoppingCart();

shoppingCart.addItem({ name: 'Short', price: 21.5 });
shoppingCart.addItem({ name: 'Pen', price: 1.19 });
shoppingCart.addItem({ name: 'Cap', price: 14.59 });
shoppingCart.checkout();

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.orderstatus);
