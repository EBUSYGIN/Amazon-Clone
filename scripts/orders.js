import {loadProductsFetch} from '../data/products.js';
import {orders} from '../data/orders.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct } from '../data/products.js';
import { addToCart } from '../data/cart.js';





async function renderOrdersPage() {
  await loadProductsFetch();



  let ordersHTML= '';

  if (orders.length <= 0 ) {
    ordersHTML += `
    
    <div class="order-header">
        <div class="order-header-left-section">
          You haven't places any orders
        </div>

        <div class="order-header-right-section">
          <a href="index.html">Go shopping</a>
        </div>
      </div>
    `;
  } else {

    orders.forEach((order) => {
      console.log(order);

      const date = dayjs(order.orderTime).format('dddd, MMMM D, YYYY');

      ordersHTML += `
      <div class="order-container">
            
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${date}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>
      
      <div class="order-details-grid">
        ${productInfo(order)}
      </div>
      `
      return ordersHTML;
    });
  }



  function productInfo(order) {
    let infoHTML = '';

    order.products.forEach((productDetails) => {
      const product = getProduct(productDetails.productId);
      infoHTML += `
      <div class="product-image-container">
      <img src="${product.image}">
    </div>
    <div class="product-details">
      <div class="product-name">
        ${product.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${
          dayjs(productDetails.estimatedDeliveryTime).format('MMMM D, YYYY')
        }
      </div>
      <div class="product-quantity data-product-quantity-${productDetails.productId}">
        Quantity: ${productDetails.quantity}
      </div>
      <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${productDetails.productId}" data-product-quantity="${productDetails.quantity}">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>
    <div class="product-actions">
      <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
      `;
    });


    return infoHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;




  const timeouts = {};


  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      const {productId} = button.dataset;
      const {productQuantity} = button.dataset;
      let timeoutId;
      

      addToCart(productId, Number(productQuantity));

      button.innerHTML = 'Added';


      clearTimeout(timeouts[productId]);
      timeoutId = setTimeout(() => {
        button.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
      timeouts[productId] = timeoutId;
      console.log(timeouts);

    });
  });
  
}










renderOrdersPage();



