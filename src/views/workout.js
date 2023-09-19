import navigationBar from './navigationBar';
import filter from './filter';
// Importamos las imagenes
import logoVitalHub from '../assets/img/logo-vitalhub.png';
import imagenWorkout from '../assets/img/imagenSinFondo.png';

function workout(navigateTo, user) {
  console.log('user desde workout:', user);
  const sectionWorkout = document.createElement('section');
  sectionWorkout.classList.add('section-workout');
  const headerWorkout = document.createElement('header');
  headerWorkout.classList.add('header-workout');
  const titleWorkout = document.createElement('h1');
  titleWorkout.classList.add('title-workout');
  titleWorkout.textContent = 'Workout';
  const img3 = document.createElement('img');
  img3.classList.add('img3');
  img3.src = logoVitalHub;
  // img3.setAtributte('src', '../assets/img/logo-vitalhub.png')
  img3.alt = 'logo vitalHub';
  // img3.setAtributte('alt', 'logo vitalHub')
  headerWorkout.append(titleWorkout, img3);
  const img6 = document.createElement('img');
  img6.classList.add('img6');
  img6.src = imagenWorkout;
  img6.alt = 'img Workout';
  const footer = document.createElement('footer');
  footer.appendChild(navigationBar(navigateTo));
  sectionWorkout.append(headerWorkout, img6, filter(user, '/workout'), footer);

  return sectionWorkout;
}

export default workout;
