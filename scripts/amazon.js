import { cart, saveToLocal } from '../data/cart.js';
import { products, loadProduct } from '../data/products.js';
loadProduct(renderProductGrid);
function renderProductGrid() {
  let html = '';
  products.forEach((product) => {
    html += `
        <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="${product.getStarURl()}"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
            ${product.extraInfoHTML()}
          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${
            product.id
          }" >Add to Cart</button>
        </div>
  `;
  });
  let cart_quantity = 0;
  document.querySelector('.products-grid').innerHTML = html;
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      let matchingItem;
      cart.forEach((item) => {
        if (productId === item.id) {
          matchingItem = item;
        }
      });
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({
          id: productId,
          quantity: 1,
          deliveryOptionId: '1',
        });
        saveToLocal();
        cart_quantity += 1;
        document.querySelector('.cart-quantity').innerHTML = cart_quantity;
      }
    });
  });
}
