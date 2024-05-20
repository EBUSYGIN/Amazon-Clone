import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/backend-practice.js';

async function loadPage() {
  await loadProductsFetch();
  
  const value = await new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  });
  console.log(value);

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage()


// allows us to run multiple promises at the same time and it waits for it to finish before going to the next step
// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve('value2');
//     });
//   })

// ]).then((values) => {
//   console.log(values);
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });





/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  });

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/



// loadProducts(() => {
//   
// });




/*


new Promise((resolve) => {
  console.log('start promise');
  setTimeout(() => {
    console.log('middle part');
    resolve();
  }, 5000)
}).then(() => {
  console.log('finish')
})

*/







