const drinkForm = document.querySelector('#drinkForm');
const drinkInput = document.querySelector('#drinkInput');
const results = document.querySelector('#results');

const apiURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

drinkForm.addEventListener('submit', chooseRoute)

function chooseRoute(e) {
  e.preventDefault();
  fetchData(drinkInput.value);
}

async function fetchData(route) {
  const response = await fetch(`${apiURL}search.php?s=${route}`);
  const data = await response.json();
  const { drinks } = data;
  console.log(drinks);
  drinks.forEach(drink => {
    displayCocktail(drink);
  });
}

function displayCocktail(drink) {
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `<h2>${drink.strDrink}</h2>`;
  results.appendChild(div);
}

