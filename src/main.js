// file main.js finished
import home from './views/home';
import login from './views/login';
import error from './views/error';
import signUp from './views/signUp';
import feed from './views/feed';

import { validateUserSession } from './lib/auth';

/* -------------Navegación----------------------------------------*/

const routes = [
  { path: '/', component: home },
  { path: '/login', component: login },
  { path: '/error', component: error },
  { path: '/signUp', component: signUp },
  { path: '/feed', component: feed },
];

const defaultRoute = '/';
const root = document.getElementById('root');

function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);

  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );

    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navigateTo));
    // } // else {
    //   navigateTo('/error');
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
<<<<<<< HEAD
// import { myFunction } from './lib/index.js';

// myFunction();
onAuthStateChanged(getAuth(), (user) => {
  if (user && window.location.pathname === '/feed') { // que no mande siempre a feed con usuario logeado
    navigateTo('/feed');
  } else if (!user && window.location.pathname === '/feed') { // que no mande siempre a login sin usuario logeado
    alert('Please, sign in to see posts');
    navigateTo('/login');
  }
});

export default navigateTo;
=======

// Observador de la sesion del usuario
validateUserSession(navigateTo);
>>>>>>> 9624f969a6d5b62889ce37397a358b91430042af
