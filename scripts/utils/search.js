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