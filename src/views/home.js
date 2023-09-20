// Importamos las imagenes
import logoVitalHub from '../assets/img/logo-vitalhub.png';
import home2 from '../assets/img/home2.png';

function home(navigateTo) {
  const homeContainer = document.createElement('div');
  if (localStorage.getItem('user')) {
    navigateTo('/feed');
  } else {
    // const homeContainer = document.createElement('div');
    homeContainer.classList.add('home-container');
    const img3 = document.createElement('img');
    img3.classList.add('img3');
    img3.src = logoVitalHub;
    img3.alt = 'logo vitalHub';
    homeContainer.appendChild(img3);
    const button = document.createElement('button');
    button.setAttribute('id', 'button');
    button.innerHTML = 'SKIP';
    button.addEventListener('click', () => {
      navigateTo('/login');
    });

    const welcome = document.createElement('h2');
    welcome.classList.add('welcome');
    welcome.innerHTML = '¡Welcome to VitalHub!';
    const divImg = document.createElement('div');
    const img = document.createElement('img');
    img.classList.add('img');
    img.src = home2;
    img.alt = 'imagen entrenando-azul';

    const homeText = document.createElement('h3');
    homeText.innerHTML = 'Because we belive in balance ...';
    const homeText2 = document.createElement('p');
    homeText2.innerHTML =
      'Share your recipes and exercise routines in a healthy environment.';
    divImg.appendChild(img);
    homeContainer.append(button, welcome, divImg, homeText, homeText2);
    return homeContainer;
  }
  return homeContainer;
}

export default home;
