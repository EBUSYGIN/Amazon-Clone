export function renderPagination(count, limit) {
  for (let i = 1; i < Math.ceil(count / limit) + 1; i++) {
    const li = document.createElement('li')
    document.querySelector('.pagination-list').appendChild(li);
    li.innerHTML = `<button class="js-pagination-button">${i}</button>`;
  }
}



export function getPaginationValue(searchValue, products) {
  let count = 0;
  products.forEach((product) => {
    if (product.name.toLowerCase().includes(searchValue.toLowerCase()) || product.keywords.includes(searchValue.toLowerCase())) {
      count++;
    }
  });
  return count;
}