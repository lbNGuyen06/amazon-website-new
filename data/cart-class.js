class Cart {
  cartItem;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromLocalStorage();
  }
  #loadFromLocalStorage() {
    this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey));
    if (!this.cartItem) {
      this.cartItem = [
        {
          id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1',
        },
        {
          id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2',
        },
      ];
    }
  }
  saveToLocal() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
  }
  remove(productId) {
    const newCart = [];
    this.cartItem.forEach((product) => {
      if (product.id !== productId) {
        newCart.push(product);
      }
    });
    this.cartItem = newCart;
    this.saveToLocal();
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    this.cartItem.forEach((cartItem) => {
      if (cartItem.id == productId) {
        cartItem.deliveryOptionId = deliveryOptionId;
      }
    });
    this.saveToLocal();
  }
  getQuantity() {
    let quantity = 0;
    this.cartItem.forEach((product) => {
      quantity += product.quantity;
    });
    return quantity;
  }
}

const cart = new Cart('cart-oop');

console.log(cart);
