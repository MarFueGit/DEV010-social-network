import navigationBar from './navigationBar';
import filter from './filter';
// Importamos las imagenes
import logoVitalHub from '../assets/img/logo-vitalhub.png';
import imagenReceta from '../assets/img/imagenreceta.png';

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
  img3.src = logoVitalHub;
  // img3.setAtributte('src', '../assets/img/logo-vitalhub.png')
  img3.alt = 'logo vitalHub';
  // img3.setAtributte('alt', 'logo vitalHub')
  headerRecipes.append(titleRecipes, img3);
  const img5 = document.createElement('img');
  img5.classList.add('img5');
  img5.src = imagenReceta;
  img5.alt = 'img recipe';
  const footer = document.createElement('footer');
  footer.appendChild(navigationBar(navigateTo));
  recipesContainer.append(
    headerRecipes,
    img5,
    filter(user, '/recipes'),
    footer,
  );

  return recipesContainer;
}

export default recipes;
