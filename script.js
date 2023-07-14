const drinkForm = document.querySelector('#drinkForm');
const drinkInput = document.querySelector('#drinkInput');

const apiURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

drinkForm.addEventListener('submit', chooseRoute)

function chooseRoute(e) {
  e.preventDefault();
  fetchData(drinkInput.value);
}

async function fetchData(route) {
  const response = await fetch(`${apiURL}search.php?s=${route}`);
  const data = await response.json();
  console.log(data);
}

