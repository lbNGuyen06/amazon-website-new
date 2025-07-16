import { rederOrOrderSummary } from './checkout/orderSummary.js';
import { rederPaymentSummary } from './checkout/paymentSummary.js';
// import '../data/cart-class.js';
import { loadProductFecth, loadProduct } from '../data/products.js';
async function loadPage() {
  try {
    console.log('adsd');
    await loadProductFecth();
    console.log('1234');
  } catch (error) {
    console.log('error');
  }
}
loadProductFecth().then(() => {
  rederOrOrderSummary();
  rederPaymentSummary();
});
// loadProduct(() => {
//   rederOrOrderSummary();
//   rederPaymentSummary();
// });
