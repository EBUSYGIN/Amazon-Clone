

export function getFilterParams() {
  let filterParams = [];
  document.querySelectorAll('.js-filtration-input').forEach((element) => {
    if (element.checked) {
      filterParams.push(element.value);
    }
  });

  return filterParams;
}


export function filterProducts(products, filterParams) {
  let result = products.filter((product) => {
    if (product.priceCents <= Number(filterParams[0]) && product.rating.stars >= Number(filterParams[1])) {
      return true
    }
  });
  return result;
}



export function renderFiltrationSection() {
  const url = new URL(window.location.href);
  const params = url.searchParams.get('filtration');
  let filterParams = [];
  if (params) {
    filterParams = params.split(',');
    console.log(filterParams);
  }
  
  let isChecked;


  const filterHTML = `
    <div class="filter__section">
      <h3 class="filter__header">Price</h3>
      <label>
        Under 100$
        <input ${isChecked = filterParams[0] === '10000' ? 'checked' : ''} value="10000" class="js-filtration-input" type="Radio" name="price-input">
      </label>
      <label>
        Under 50$
        <input ${isChecked = filterParams[0] === '5000' ? 'checked' : ''} value="5000" class="js-filtration-input" type="Radio" name="price-input">
      </label>
      <label>
        Under 30$
        <input ${isChecked = filterParams[0] === '3000' ? 'checked' : ''} value="3000" class="js-filtration-input" type="Radio" name="price-input">
      </label>
      <label>
        Under 15$
        <input ${isChecked = filterParams[0] === '1500' ? 'checked' : ''} value="1500" class="js-filtration-input" type="Radio" name="price-input">
      </label>
    </div>


    <div class="filter__section">
      <h3 class="filter__header">Raitings</h3>
      <label>
        <img class="reviews-img" src="./images/ratings/rating-50.png">& Up
        <input ${isChecked = filterParams[1] === '5.0' ? 'checked' : ''} value="5.0" class="js-filtration-input" type="radio" name="raiting-input">
      </label>
      <label>
        <img class="reviews-img" src="./images/ratings/rating-45.png">& Up
        <input ${isChecked = filterParams[1] === '4.5' ? 'checked' : ''} value="4.5" class="js-filtration-input" type="radio" name="raiting-input">
      </label>
      <label>
        <img class="reviews-img" src="./images/ratings/rating-40.png">& Up
        <input ${isChecked = filterParams[1] === '4.0' ? 'checked' : ''} value="4.0" class="js-filtration-input" type="radio" name="raiting-input">
      </label>
      <label>
        <img class="reviews-img" src="./images/ratings/rating-35.png">& Up
        <input ${isChecked = filterParams[1] === '3.5' ? 'checked' : ''} value="3.5" class="js-filtration-input" type="radio" name="raiting-input">
      </label>
      <label>
        <img class="reviews-img" src="./images/ratings/rating-30.png">& Up
        <input ${isChecked = filterParams[1] === '3.0' ? 'checked' : ''} value="3.0" class="js-filtration-input" type="radio" name="raiting-input">
      </label>
      <label>
        <img class="reviews-img" src="./images/ratings/rating-25.png">& Up
        <input ${isChecked = filterParams[1] === '2.5' ? 'checked' : ''} value="2.5" class="js-filtration-input" type="radio" name="raiting-input">
      </label>
    </div>
  `
  return filterHTML;
}



