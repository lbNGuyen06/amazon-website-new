import { rederOrOrderSummary } from '../../scripts/checkout/orderSummary.js';
describe('test suit: renderOrderSummary', () => {
  it('displays the cart ', () => {
    document.querySelector('.js-test-container').innerHTML = `
    <div class = "js-order-summary"></div>`;
  });
});
