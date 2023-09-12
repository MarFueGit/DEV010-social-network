// file main.js finished
import { onAuthStateChanged } from 'firebase/auth';
import home from './views/home';
import login from './views/login';
import error from './views/error';
// eslint-disable-next-line import/no-unresolved
import signUp from './views/signUp';
import feed from './views/feed';
import resetPassword from './views/resetPassword';
import recipes from './views/recipes';
import workout from './views/workout';
import profile from './views/profile';
import navigationBar from './views/navigationBar';

import { auth } from './firebase';

/* -------------Navegación----------------------------------------*/

const routes = [
  { path: '/', component: home },
  { path: '/login', component: login },
  { path: '/error', component: error },
  { path: '/signUp', component: signUp },
  { path: '/feed', component: feed },
  { path: '/resetPassword', component: resetPassword },
  { path: '/recipes', component: recipes },
  { path: '/workout', component: workout },
  { path: '/profile', component: profile },
  { path: '/navigationBar', component: navigationBar },
];

const defaultRoute = '/';
const root = document.getElementById('root');
// variable user global
let userGlobal;

function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);

  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );

    // Mientras la nueva ruta tenga hijos o nodos, borralos todos y agrega un nuevo y unico hijo
    while (root.firstChild) {
      root.firstChild.remove();
    }
    // if (root.firstChild) {
    //   root.removeChild(root.firstChild);
    // }

    // Agrega la nueva ruta, le pasa navigateTo y el usuario global
    root.appendChild(route.component(navigateTo, userGlobal));
  } else {
    navigateTo('/error');
  }
}

// Observador de la sesion del usuario, obtenemos primero el usuario y despues navegamos en la app
onAuthStateChanged(auth, (user) => {
  console.log('user desde el observador:', user);
  if (user) {
    userGlobal = user;
    navigateTo(window.location.pathname);
  } else {
    userGlobal = undefined;
    navigateTo(defaultRoute);
  }
});

// Inicia app
window.onpopstate = () => {
  navigateTo(window.location.pathname);
};
