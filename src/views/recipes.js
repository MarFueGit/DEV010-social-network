import navigationBar from './navigationBar';

function recipes(navigateTo) {
  const divTitle = document.createElement('section');
  divTitle.className = 'divTitle';
  const header = document.createElement('header');
  const title = document.createElement('h1');
  title.textContent = 'Recipes';
  const img3 = document.createElement('img');
  img3.className = 'img3';
  img3.src = '../assets/img/logo-vitalhub.png';
  img3.alt = 'logo vitalHub';
  header.append(title, img3);
  const footer = document.createElement('footer');
  footer.appendChild(navigationBar(navigateTo));
  divTitle.append(header, footer);
  return divTitle;
}

export default recipes;
