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
  


  let orderDetails;
  matchingOrder.products.forEach((product) => {
    if (productId === product.productId) {
      orderDetails = product;
    }
  });



  const today = dayjs();
  const orderTime = dayjs(matchingOrder.orderTime);
  const deliveryTime = dayjs(orderDetails.estimatedDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
  
  


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
        <div class="progress-label ${
          percentProgress < 50 ? 'current-status' : ''
        }">
          Preparing
        </div>
        <div class="progress-label ${
          (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
        }">
          Shipped
        </div>
        <div class="progress-label ${
          percentProgress >= 100 ? "current-status" : ''
        }">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${percentProgress}%;"></div>
      </div>
    </div>
  
  `;

  document.querySelector('.js-main').innerHTML = trackingHTML;
  
}


renderTrackingPage();