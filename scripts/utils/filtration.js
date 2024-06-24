

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



