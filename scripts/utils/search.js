export function search() {
  function getUrlParams() {
    const searchValue = document.querySelector('.js-search-bar').value;
    window.location.href = `index.html?searchValue=${searchValue}`;
  }



  
  document.querySelector('.js-search-button').addEventListener('click', getUrlParams);

  document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      getUrlParams();
    } 
  });
  
}



export function getSearchedProducts(products, searchValue) {
  const searchArray = products.filter((product) => {
    if (product.name.toLowerCase().includes(searchValue.toLowerCase()) || product.keywords.includes(searchValue.toLowerCase())) {
      return true
    }
  });
  return searchArray;
}

