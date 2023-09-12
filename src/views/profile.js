import { signOutUser } from '../lib/auth';
import navigationBar from './navigationBar';
import filter from './filter';

function profile(navigateTo, user) {
  console.log('user desde profile', user);
  const profileContainer = document.createElement('div');
  // Variable para guardar la info del usuario de firebase

  // Si el usuario cambio o agrego post, reseteamos el contenedor y renderizamos de nuevo
  profileContainer.innerHTML = '';
  profileContainer.classList.add('profile-container');
  const profileTitle = document.createElement('h2');
  profileTitle.classList.add('profile-title');
  profileTitle.textContent = 'Profile';
  const img4 = document.createElement('img');
  img4.classList.add('img4');
  img4.src = '../assets/img/logo-vitalhub (1)2.png';
  img4.alt = 'logo vitalHub';
  const botonSignOut = document.createElement('button');
  botonSignOut.classList.add('boton-signOut');
  botonSignOut.textContent = 'Sign Out';
  botonSignOut.addEventListener('click', async (e) => {
    e.preventDefault(e);
    await signOutUser();
    navigateTo('/');
  });
  const nameProfile = document.createElement('h2');
  nameProfile.classList.add('name-profile');
  nameProfile.textContent = user.displayName;
  const email = document.createElement('input');
  email.classList.add('email');
  // asiganmos al input el valor del correo del usuario de firebase
  email.value = user.email;
  // Deshabilitamos el input para que sea solo de lectura
  email.setAttribute('disabled', true);
  // Label de titulo para post del usuario
  const h3 = document.createElement('h3');
  // Titulo post of user
  h3.textContent = `Posts of ${user.displayName}`;

  const footer = document.createElement('footer');
  footer.appendChild(navigationBar(navigateTo));
  profileContainer.append(
    profileTitle,
    img4,
    botonSignOut,
    nameProfile,
    email,
    h3,
    filter(user, '/profile'),
    footer,
  );

  return profileContainer;
}

export default profile;
