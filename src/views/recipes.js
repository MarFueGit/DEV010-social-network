import navigationBar from './navigationBar';
import filter from './filter';

function recipes(navigateTo, user) {
  console.log('user desde recipes:', user);
  const recipesContainer = document.createElement('section');
  recipesContainer.classList.add('recipes-container');
  const headerRecipes = document.createElement('header');
  headerRecipes.classList.add('header-recipes');
  const titleRecipes = document.createElement('h1');
  titleRecipes.classList.add('title-recipes');
  titleRecipes.textContent = 'Recipes';
  const img3 = document.createElement('img');
  img3.classList.add('img3');
  img3.src = '../assets/img/logo-vitalhub.png';
  // img3.setAtributte('src', '../assets/img/logo-vitalhub.png')
  img3.alt = 'logo vitalHub';
  // img3.setAtributte('alt', 'logo vitalHub')
  headerRecipes.append(titleRecipes, img3);
  const img5 = document.createElement('img');
  img5.classList.add('img5');
  img5.src = '../assets/img/imagenreceta.png';
  img5.alt = 'img recipe';
  const footer = document.createElement('footer');
  footer.appendChild(navigationBar(navigateTo));
  recipesContainer.append(headerRecipes, img5, filter(user, '/recipes'), footer);

  return recipesContainer;
}

export default recipes;
