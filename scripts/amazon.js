import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

loadProducts(renderProductsGrid);


function search() {
  document.querySelector('.js-search-button').addEventListener('click', () => {
    const searchValue = document.querySelector('.js-search-bar').value;
    console.log(searchValue);
    window.location.href = `index.html?searchValue=${searchValue}`
  }); 
}


function renderProductsGrid() {
  
  search();

  const url = new URL(window.location.href);
  const searchValue = url.searchParams.get('searchValue');

  
  
  
  let productsHTML = '';

  if (searchValue) {
    products.forEach((product) => {
      if (product.name.toLowerCase().includes(searchValue.toLowerCase()) || product.keywords.includes(searchValue.toLowerCase())) {
        productsHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${formatCurrency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
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

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
          `;
      }
     });
  } else {
    
    products.forEach((product) => {
      productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${formatCurrency(product.priceCents)}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
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

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
      `;
    });
  }

  document.querySelector('.js-products-grid').innerHTML = productsHTML;



  function getTheQuantity(productId) {
    const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    return quantity;
  }

  function addedMessage(productId) {
    const message = document.querySelector(`.js-added-to-cart-${productId}`);
    message.classList.add('js-added-to-cart-visible');
  }

  function removeMessage(productId) {
    const message = document.querySelector(`.js-added-to-cart-${productId}`);
    message.classList.remove('js-added-to-cart-visible');
  }




  const timeouts = {};


  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      // const productId = button.dataset.productId;
      const {productId} = button.dataset;
      let timeoutId;
      const quantity = getTheQuantity(productId);



      addedMessage(productId);

      
      clearTimeout(timeouts[productId]);
      timeoutId = setTimeout(() => {
        removeMessage(productId);
      }, 1000);
      timeouts[productId] = timeoutId;



      addToCart(productId, quantity);

      

      // // Putting items in the cart + finding repeating items
      // cart.forEach((cartItem) => {
      //   if (productId === cartItem.productId) {
      //     matchingItem = cartItem;
      //   }
      // });

      
      // if (matchingItem) {
      //   matchingItem.quantity += quantity;
      // } else {
      //   cart.push({
      //   // productId: productId,
      //   // quantity: quantity
      //   productId,
      //   quantity
      // });
      // }
      
      document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
    });
  });
  document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
}





