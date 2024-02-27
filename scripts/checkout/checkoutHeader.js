import { calculateCartQuantity } from "../../data/cart.js";





export function renderCheckoutHeader() {

  // getting cart quantity to display in the header
  const cartQuantity = calculateCartQuantity();

  
  const headerHTML = `
  
  Checkout (<a class="return-to-home-link js-return-to-home-link"
            href="amazon.html">${cartQuantity} items</a>)
  
  `;



  document.querySelector('.js-header-middle-section').innerHTML = headerHTML;
}