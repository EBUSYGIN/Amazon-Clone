import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import {products, getProduct} from "../../data/products.js";
import { formatCurrency } from ".././utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; // default export 
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import { calculateDeliveryDays } from "../../data/deliveryOptions.js";



export function renderOrderSummary() {

  // Putting the number of the items on the page
  // document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} items`;


  let cartSummaryHTML = '';


  cart.forEach((cartItem) => {


    // getting productId 
    const productId = cartItem.productId;




    // getting delivery option id out of the cart to display right delivery date
      const deliveryOptionId = cartItem.deliveryOptionId;
      

      // getting full delivery option object to display info on the page 
      const deliveryOption = getDeliveryOption(deliveryOptionId);
      
      // const today = dayjs();
      // const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = calculateDeliveryDays(deliveryOption);




    // Finding the matching products in products array to get values and put html on the page
    const matchingProduct = getProduct(productId);

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    `;
  });







  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    // creating delivery options to display om the page
    deliveryOptions.forEach((deliveryOption) => {


      // getting the right day from today to display
      // const today = dayjs();
      // const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = calculateDeliveryDays(deliveryOption);
    
      

      // getting the right price
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      // getting the right radio selector to be selected
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : '';
      


      html += `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked} class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>`
    });


    return html;
    
  }




  // putting html on the page
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;



  //make delete link work
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId


      // Deleting item from the cart and from the page
      removeFromCart(productId);
      // document.querySelector(`.js-cart-item-container-${productId}`).remove();
      renderOrderSummary();
      renderPaymentSummary();
      renderCheckoutHeader();


      //Updating number of items to display after deleting
      // document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} items`;
    });
  });





  // Getting all the update links on the page
  document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      
      // getting special product container and adding class to it
      const updateElement = document.querySelector(`.js-cart-item-container-${productId}`);
      updateElement.classList.add('is-editing-quantity');
    });
  });





  // Getting all the save links on the page
  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {

      //getting productId taking container
      const productId = link.dataset.productId;
      const containerElement = document.querySelector(`.js-cart-item-container-${productId}`);

      // removing class from the container to make its inner element dissapear
      containerElement.classList.remove('is-editing-quantity');

      //Getting the value that user enters when clicking save
      const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

      // Checking if user inputs value less than 0
      if (newQuantity < 0) {
        alert('Quantity cannot be less than 0');
      } else {
        // Updating the quantity of the product in the cart 
        updateQuantity(productId, newQuantity);
        renderCheckoutHeader();
        renderPaymentSummary();




        // Updating the quantity to display on the page
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
        // document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} items`;
        
      }
    });
  });




  // Selecting all the input elements on the page and adding event Enter
  document.querySelectorAll('.quantity-input').forEach((inputElement) =>{
    inputElement.addEventListener('keydown', (event) => {

      // checking for enter and getting exact number with the id 
      if (event.key === 'Enter') {
        const productId = inputElement.dataset.productId;
        const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

        // checking if the user inputs value less than 0
        if (newQuantity < 0) {
          alert('Quantity cannot be less than 0');
        } else {

          // updating quantity using function and displaying quantity change on the page
          updateQuantity(productId, newQuantity);
          renderCheckoutHeader();
          document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
          // document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} items`;
          
          renderPaymentSummary();

          // removing class to hide input element
          const containerElement = document.querySelector(`.js-cart-item-container-${productId}`);
          containerElement.classList.remove('is-editing-quantity');
        }
      }
    });
  });





  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}








