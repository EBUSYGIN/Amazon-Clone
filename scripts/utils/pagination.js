export function renderPagination(products, limit) {
  for (let i = 1; i < Math.ceil(products.length / limit) + 1; i++) {
    const li = document.createElement('li')
    document.querySelector('.pagination-list').appendChild(li);
    li.innerHTML = `<button class="js-pagination-button">${i}</button>`;
  }
}