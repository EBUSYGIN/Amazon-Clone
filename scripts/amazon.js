import {addToCart, calculateCartQuantity} from '../data/cart.js';
import {products, renderProducts, loadProductsFetch} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import { search } from './utils/search.js';
import { getPaginationValue, renderPagination } from './utils/pagination.js';


async function loadMainPage() {
  let flag = false;
  try {
    await loadProductsFetch();
    flag = true
  } catch(error) {
    console.log(error);
  }

  if (flag === true) {
    preloader.classList.add('preloader-hide');
    renderProductsGrid();
  }
}

loadMainPage();



function renderProductsGrid() {
  
  search();

  const url = new URL(window.location.href);
  const searchValue = url.searchParams.get('searchValue');
  const pageNum = url.searchParams.get('page') || 0;
  const limit = 10;
  const start = pageNum * limit;
  const end = start + limit;
  document.querySelector('.js-search-bar').value = searchValue;
  

  
  let productsHTML = '';
  let count = products.length;



  if (searchValue) {
    const searchArray = products.filter((product) => {
      if (product.name.toLowerCase().includes(searchValue.toLowerCase()) || product.keywords.includes(searchValue.toLowerCase())) {
        return true
      }
    });
    const paginatedProducts = searchArray.slice(start, end);
    count = getPaginationValue(searchValue, products)
    productsHTML = renderProducts(paginatedProducts, formatCurrency);
    renderPagination(count, limit);
  } else {
    const paginatedProducts = products.slice(start, end);
    productsHTML = renderProducts(paginatedProducts, formatCurrency);
    renderPagination(count, limit);
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

  document.querySelectorAll('.js-pagination-button').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.innerHTML;
      if (searchValue) {
        window.location.href = `index.html?searchValue=${searchValue}&page=${value - 1}`;
      } else {
        window.location.href = `index.html?page=${value-1}`;
      }
      ; 
    });
  });
}
