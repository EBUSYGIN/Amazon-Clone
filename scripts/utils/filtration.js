

export function getFilterParams() {
  let filterParams = {
    // price: 0,
    // stars: 0
  };
  document.querySelectorAll('.js-filtration-input-price').forEach((element) => {
    if (element.checked) {
      filterParams.price = element.value;
    }
  });

  document.querySelectorAll('.js-filtration-input-stars').forEach((element) => {
    if (element.checked) {
      filterParams.stars = element.value;
    }
  });


  return JSON.stringify(filterParams);
}


export function filterProducts(products, filterParams) {
  const price = Number(filterParams.price);
  const stars = Number(filterParams.stars);
  let result;

  if (price && stars) {
    result = products.filter((product) => {
      if (product.priceCents <= price && product.rating.stars >= stars) {
        return true
      }
    });
  } else {
    result = products.filter((product) => {
      if (product.priceCents <= price) {
        return true;
      } else if (product.rating.stars >= stars) {
        return true;
      }
    });
  }

  return result;
}



export function renderFiltrationSection() {
  const url = new URL(window.location.href);
  const params = url.searchParams.get('filtration');
  const filterParams = JSON.parse(params);
  let price = '';
  let stars = '';

  if (filterParams) {
    if (filterParams['price']) {
      price = filterParams.price;
    }
  
    if (filterParams['stars']) {
      stars = filterParams.stars;
    }
  }

  // if (filterParams) {
  //   if (filterParams['price']) {
  //     price
  //   }
  //    if (filterParams['stars']) {
  //     console.log(filterParams.stars)
  //    }
  // }
  
  let isChecked;


  const filterHTML = `
    <div class="filter__section">
      <h3 class="filter__header">Price</h3>
      <label>
        Under 100$
        <input ${isChecked = price === '10000' ? 'checked' : ''} value="10000" class="js-filtration-input-price" type="Radio" name="price-input">
      </label>
      <label>
        Under 50$
        <input ${isChecked = price === '5000' ? 'checked' : ''} value="5000" class="js-filtration-input-price" type="Radio" name="price-input">
      </label>
      <label>
        Under 30$
        <input ${isChecked = price === '3000' ? 'checked' : ''} value="3000" class="js-filtration-input-price" type="Radio" name="price-input">
      </label>
      <label>
        Under 15$
        <input ${isChecked = price === '1500' ? 'checked' : ''} value="1500" class="js-filtration-input-price" type="Radio" name="price-input">
      </label>
    </div>


    <div class="filter__section">
      <h3 class="filter__header">Raitings</h3>
      <label>
        <img class="reviews-img" src="./images/ratings/rating-50.png">& Up
        <input ${isChecked = stars === '5.0' ? 'checked' : ''} value="5.0" class="js-filtration-input-stars" type="radio" name="raiting-input">
      </label>
      <label>
        <img class="reviews-img" src="./images/ratings/rating-45.png">& Up
        <input ${isChecked = stars === '4.5' ? 'checked' : ''} value="4.5" class="js-filtration-input-stars" type="radio" name="raiting-input">
      </label>
      <label>
        <img class="reviews-img" src="./images/ratings/rating-40.png">& Up
        <input ${isChecked = stars === '4.0' ? 'checked' : ''} value="4.0" class="js-filtration-input-stars" type="radio" name="raiting-input">
      </label>
      <label>
        <img class="reviews-img" src="./images/ratings/rating-35.png">& Up
        <input ${isChecked = stars === '3.5' ? 'checked' : ''} value="3.5" class="js-filtration-input-stars" type="radio" name="raiting-input">
      </label>
      <label>
        <img class="reviews-img" src="./images/ratings/rating-30.png">& Up
        <input ${isChecked = stars === '3.0' ? 'checked' : ''} value="3.0" class="js-filtration-input-stars" type="radio" name="raiting-input">
      </label>
      <label>
        <img class="reviews-img" src="./images/ratings/rating-25.png">& Up
        <input ${isChecked = stars === '2.5' ? 'checked' : ''} value="2.5" class="js-filtration-input-stars" type="radio" name="raiting-input">
      </label>
    </div>
  `
  return filterHTML;
}



