import { getProduct } from '../../data/products.js';
import { cart, getQuantity } from '../../data/cart.js';
import { getDiliveryOption } from '../../data/deliveryOption.js';
import { formartCurrency } from '../utils/money.js';
export function rederPaymentSummary() {
  let productPriceCents = 0;
  let deliveryPrice = 0;
  cart.forEach((element) => {
    const product = getProduct(element.id);
    productPriceCents += product.priceCents * element.quantity;

    const deliveryOption = getDiliveryOption(element.deliveryOptionId);
    deliveryPrice += deliveryOption.priceCents;
  });
  console.log(productPriceCents);
  console.log(deliveryPrice);

  const totalbeforTax = productPriceCents + deliveryPrice;
  const TaxCents = totalbeforTax * 0.1;
  const totalCents = totalbeforTax + TaxCents;

  const html = `
          <div class="payment-summary-row">
            <div>Items (${getQuantity()}):</div>
            <div class="payment-summary-money">$${formartCurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formartCurrency(
              deliveryPrice
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formartCurrency(
              totalbeforTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formartCurrency(
              TaxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formartCurrency(
              totalCents
            )}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>`;
  document.querySelector('.js-payment-summary').innerHTML = html;
  document
    .querySelector('.js-place-order')
    .addEventListener('click', async () => {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart: cart,
        }),
      });
      const order = await response.json();
      console.log(order);
    });
}
