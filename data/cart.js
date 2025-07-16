export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
  cart = [
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

export function saveToLocal() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function remove(productId) {
  const newCart = [];
  cart.forEach((product) => {
    if (product.id !== productId) {
      newCart.push(product);
    }
  });
  cart = newCart;
  saveToLocal();
}
export function updateDeliveryOption(productId, deliveryOptionId) {
  cart.forEach((cartItem) => {
    if (cartItem.id == productId) {
      cartItem.deliveryOptionId = deliveryOptionId;
    }
  });
  saveToLocal();
}
export function getQuantity() {
  let quantity = 0;
  cart.forEach((product) => {
    quantity += product.quantity;
  });
  return quantity;
}
