import { loadProductsFetch, products } from "../data/products.js";
import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import { getOrder } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


async function renderTrackingPage() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  await loadProductsFetch();
  

  const matchingProduct = getProduct(productId);
  const matchingOrder = getOrder(orderId);
  console.log(matchingProduct);
  console.log(matchingOrder);


  let orderDetails;
  matchingOrder.products.forEach((product) => {
    if (productId === product.productId) {
      orderDetails = product;
    }
  });
  console.log(orderDetails);

  let trackingHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
      Arriving on ${
        dayjs(orderDetails.estimatedDeliveryTime).format('dddd, MMMM D, YYYY')
      }
      </div>

      <div class="product-info">
        ${matchingProduct.name}
      </div>

      <div class="product-info">
        Quantity: ${orderDetails.quantity}
      </div>

      <img class="product-image" src="${matchingProduct.image}">

      <div class="progress-labels-container">
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-label current-status">
          Shipped
        </div>
        <div class="progress-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
    </div>
  
  `;

  document.querySelector('.js-main').innerHTML = trackingHTML;
  
}


renderTrackingPage();