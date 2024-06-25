import {addToCart, calculateCartQuantity} from '../data/cart.js';
import {products, renderProducts, loadProductsFetch} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import { search } from './utils/search.js';
import { renderPagination } from './utils/pagination.js';
import { getFilterParams, filterProducts } from './utils/filtration.js';
import { getSearchedProducts } from './utils/search.js';




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



// const a = [1, 2, 3, 4, 5, 6, 10, 8, 2, 3, 4, 5];

// const b = [10, 3, 2, 4, 1];

// let result = a.filter( z => b.indexOf(z) !== -1 );


// console.log(result);



function renderProductsGrid() {
  
  search();


  const url = new URL(window.location.href);
  const searchValue = url.searchParams.get('searchValue');
  const filtration = url.searchParams.get('filtration');
  const pageNum = url.searchParams.get('page') || 0;
  const limit = 10;
  const start = pageNum * limit;
  const end = start + limit;
  document.querySelector('.js-search-bar').value = searchValue;



  // let filterParams = getFilterParams()
  // console.log(filterParams);

  // let result = filterProducts(products, filterParams);
  // console.log(result);

  let productsHTML = '';

  if (filtration && searchValue) {
    const filterParams = filtration.split(',');
    const filteredProducts = filterProducts(products, filterParams);
    const result = getSearchedProducts(filteredProducts, searchValue);
    const paginatedProducts = result.slice(start, end);
    console.log(paginatedProducts);
    const count = result.length;
    console.log(count);
    productsHTML = renderProducts(paginatedProducts, formatCurrency);
    renderPagination(count, limit);
  } else if (filtration) {
    const filterParams = filtration.split(',');
    const result = filterProducts(products, filterParams);
    const paginatedProducts = result.slice(start, end);
    const count = result.length;
    productsHTML = renderProducts(paginatedProducts, formatCurrency);
    renderPagination(count, limit);
  } else if (searchValue) {
    const result = getSearchedProducts(products, searchValue);
    const paginatedProducts = result.slice(start, end);
    const count = result.length;
    productsHTML = renderProducts(paginatedProducts, formatCurrency);
    renderPagination(count, limit);
  } else {
    const paginatedProducts = products.slice(start, end);
    productsHTML = renderProducts(paginatedProducts, formatCurrency);
    const count = products.length;
    renderPagination(count, limit);
  }
  



  // if (searchValue) {
  //   const searchArray = products.filter((product) => {
  //     if (product.name.toLowerCase().includes(searchValue.toLowerCase()) || product.keywords.includes(searchValue.toLowerCase())) {
  //       return true
  //     }
  //   });
  //   const paginatedProducts = searchArray.slice(start, end);
  //   count = getPaginationValue(searchValue, products)
  //   productsHTML = renderProducts(paginatedProducts, formatCurrency);
    
  // } else {
  //   const paginatedProducts = products.slice(start, end);
  //   productsHTML = renderProducts(paginatedProducts, formatCurrency);
  //   renderPagination(count, limit);
  // }

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
      const url = new URL(window.location.href);
      url.searchParams.set('page', `${value - 1}`);
      window.location.href = url;
    });
  });



  document.querySelector('.js-filtration-button').addEventListener('click', () => {
    const filterParams = getFilterParams();
    

    let url = new URL(window.location.href);
    url.searchParams.set('filtration', `${filterParams}`);
    window.location.href = url;
  });
}
