import {
  cart,
  remove,
  saveToLocal,
  updateDeliveryOption,
} from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formartCurrency } from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOption.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { rederPaymentSummary } from './paymentSummary.js';
export function rederOrOrderSummary() {
  let html = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.id;
    let deliveryDateString = '';
    deliveryOptions.forEach((option) => {
      if (option.id == cartItem.deliveryOptionId) {
        const toDay = dayjs();
        const deliveryDate = toDay.add(option.deliveryDay, 'days');
        const dateString = deliveryDate.format('dddd MMMM D');
        deliveryDateString = dateString;
      }
    });
    products.forEach((product) => {
      if (productId === product.id) {
        html += `<div class="cart-item-container js-cart-container-${productId}">
              <div class="delivery-date">${deliveryDateString}</div>

              <div class="cart-item-details-grid">
                <img
                  class="product-image"
                  src="${product.image}"
                />

                <div class="cart-item-details">
                  <div class="product-name">
                    ${product.name}
                  </div>
                  <div class="product-price">$${formartCurrency(
                    product.priceCents
                  )}</div>
                  <div class="product-quantity">
                    <span> Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span> </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${productId}>
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                    ${deliveryOptionsHTML(productId, cartItem)}
                </div>
              </div>
            </div>`;
      }
    });
  });
  function deliveryOptionsHTML(productId, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const toDay = dayjs();
      const deliveryDate = toDay.add(deliveryOption.deliveryDay, 'days');
      const dateString = deliveryDate.format('dddd MMMM D');
      const priceString =
        deliveryOption.priceCents === 0
          ? 'FREE'
          : `${deliveryOption.priceCents * 100}-`;
      const isChecked = deliveryOption.id == cartItem.deliveryOptionId;
      html += `  <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-id="${
        deliveryOption.id
      }">
                    <input
                      type="radio"
                      ${isChecked ? 'checked' : ''}
                      class="delivery-option-input"
                      name="delivery-option-${productId}"
                    />
                    <div>
                      <div class="delivery-option-date">${dateString}</div>
                      <div class="delivery-option-price">${priceString} - Shipping</div>
                    </div>
                  </div>`;
    });
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = html;
  document.querySelectorAll('.js-delete-link').forEach((delete_button) => {
    delete_button.addEventListener('click', () => {
      const productId = delete_button.dataset.productId;
      remove(productId);
      // console.log(cart);
      const delete_container = document.querySelector(
        `.js-cart-container-${productId}`
      );
      rederPaymentSummary();
      delete_container.remove();
    });
  });
  document
    .querySelectorAll('.js-delivery-option')
    .forEach((delivery_button) => {
      delivery_button.addEventListener('click', () => {
        const pro1 = delivery_button.dataset.productId;
        const deli1 = delivery_button.dataset.deliveryId;
        console.log(pro1, deli1);
        updateDeliveryOption(pro1, deli1);
        rederOrOrderSummary();
        rederPaymentSummary();
      });
    });
}
