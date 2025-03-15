
function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then(res => res.json())
  .then(data => displayCategories(data.categories))
}
function displayCategories(categories){
  const categoryContainer = document.getElementById('category-container');
  for(category of categories){
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-sm','bg-gray-300');
    button.innerText = `${category.category}`;
    categoryContainer.appendChild(button);

  }
}

loadCategories();