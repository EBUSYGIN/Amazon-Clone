export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryOptionId: '1'
}, {
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
  deliveryOptionId: '2'
}];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}



export function addToCart(productId, quantity) {
  let matchingItem;

  // Putting items in the cart + finding repeating items
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
    // productId: productId,
    // quantity: quantity
    productId,
    quantity,
    deliveryOptionId: '1'
  });
  }


  saveToStorage();
}


export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }

    cart = newCart;
    saveToStorage();
  });
}



//Getting number of the products in the cart
export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}



export function updateQuantity(productId, quantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = quantity;
      // console.log(cartItem.quantity);
      // console.log(productId, cartItem.productId);
    }
  });
  saveToStorage();
}



export function updateDeliveryOption(productId, deliveryOptionId) {

  // Putting items in the cart + finding repeating items
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      cartItem.deliveryOptionId = deliveryOptionId;
      // console.log(cartItem.deliveryOptionId);
    }
  });

  // matchingItem.deliveryOptionId = deliveryOptionId;
  // console.log(matchingItem.deliveryOptionId);
  saveToStorage();
}


// export function updateDeliveryOption(productId, deliveryOptionId) {
//   let matchingItem;

//   cart.forEach((cartItem) => {
//     if (productId === cartItem.productId) {
//       matchingItem = cartItem;
//     }
//   });

//   matchingItem.deliveryOptionId = deliveryOptionId;

//   saveToStorage();
// }
