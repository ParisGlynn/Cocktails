const drinkForm = document.querySelector('#drinkForm');
const drinkInput = document.querySelector('#drinkInput');
const results = document.querySelector('#results');
const nameBtn = document.querySelector('#nameBtn');
const ingredientBtn = document.querySelector('#ingredientBtn');
const container = document.querySelector('.container');

const apiURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

nameBtn.addEventListener('click', searchByName);
ingredientBtn.addEventListener('click', searchByIngredient);

drinkForm.addEventListener('submit', chooseRoute);

function chooseRoute(e) {
  e.preventDefault();
  results.innerHTML = '';
  let dataToGet = '';
  if(drinkInput.getAttribute('placeholder') === 'Name of cocktail') {
    dataToGet = 'search.php?s=' + drinkInput.value;
  } else if(drinkInput.getAttribute('placeholder') === 'Ingredient of cocktail') {
    dataToGet = 'filter.php?i=' + drinkInput.value;
  }
  fetchData(dataToGet);
}

function searchByName() {
  nameBtn.style.opacity = 0.4;
  ingredientBtn.style.opacity = 1;
  drinkInput.setAttribute('placeholder', 'Name of cocktail');
}

function searchByIngredient() {
  ingredientBtn.style.opacity = 0.4;
  nameBtn.style.opacity = 1;
  drinkInput.setAttribute('placeholder', 'Ingredient of cocktail');
  
}

async function fetchData(route) {
  const response = await fetch(`${apiURL}${route}`);
  console.log(response);
  const data = await response.json();
  
  // console.log(data);
  const { drinks } = data;
  
  if(drinks === null) {
    displayMessage('Sorry, no results found');
    return;
  }

  if(drinkInput.value === '') {
    displayMessage('Nothing entered');
    return;
  }

  drinks.forEach(drink => { 
    displayCocktail(drink);
    });
    if(drinkInput.getAttribute('placeholder') === 'Ingredient of cocktail') {
      const info = document.querySelectorAll('.info');
      const instruct = document.querySelectorAll('.instruct');
      instruct.forEach(inst => inst.style.backgroundColor = '#f690dd');
      info.forEach(inf => inf.style.display = 'none');
    }
    drinkInput.value = '';
}

function displayCocktail(drink) {
  
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
                  <h3>${drink.strDrink}</h3>
                  <img src = '${drink.strDrinkThumb}'>
                  <div class = 'info'>
                  <p class = 'glassType'>Glass Type: ${drink.strGlass ? drink.strGlass : ''}</p>
                  <h3 class = 'ing-head'>Ingredients:</h3>
  `;

  results.appendChild(div);

  const ingredients = [];
  for(let i = 1; i < 16; i++) {
    if(drink['strIngredient' + i]) {
      ingredients.push([drink['strIngredient' + i], drink['strMeasure' + i]]);
    }
  }

  ingredients.forEach((ingredient) => {
    const p = document.createElement('p');
    p.classList.add('part');
    p.innerHTML = `${ingredient[0]}: ${ingredient[1] ? ingredient[1] : ''}`;
    div.appendChild(p);
  })
  
  div.innerHTML = div.innerHTML + `<p class = 'instruct'>${drink.strInstructions ? drink.strInstructions : ''}</p></div>`;

  console.log(drinkInput.getAttribute('placeholder'));
}

function displayMessage(theMessage) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = theMessage;
  container.appendChild(div);
  window.setTimeout(() => div.remove(), 3000);
  console.log(div);
}

