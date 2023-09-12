// file login finished
import { loginUser, loginWithGoogle } from '../lib/auth';

function login(navigateTo) {
  const divContainer = document.createElement('div');
  divContainer.classList.add('login-container');
  divContainer.innerHTML = `
  <img
    class="img1"
        src="../assets/img/logo-vitalhub (1)2.png" 
        alt="imagen logo red social"
        />
    <form id="login-form" data-testid="form-input">
      <label for="">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Write your email" data-testid="email"
        required
        />
      <label for="">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Write your password" data-testid="password"
        required
        />
      <button class="button-login" type="submit">Log in</button>
      <p class="paragraf">Or</p>
      <button class="button-google" type="submit">
      <i class="fa-brands fa-google"></i>Continue with Google
      </button>
      <a href="" class="button-forget">Forgot my password</a>
      <a class="button-register">Don't you have an account? Sign up! </a>
    </form>
    `;
  /*
  invocamos a divContainer en lugar de document, por que el divContainer aun no existe en el DOM
  Existira en el DOM hasta que retornemos divContainer
  */
  // const img = document.createElement('img');
  // img.classList.add('img1');
  // img.src = '../assets/img/logo-vitalhub (1).png';
  // img.alt = 'logoVitalHub';

  const email = divContainer.querySelector('input[name="email"]');
  const password = divContainer.querySelector('input[name="password"]');
  const loginForm = divContainer.querySelector('#login-form');
  const buttonGoogle = divContainer.querySelector('.button-google');
  const buttonForgetPassword = divContainer.querySelector('.button-forget');
  buttonForgetPassword.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/resetPassword');
  });
  const buttonRegister = divContainer.querySelector('.button-register');
  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/signUp');
  });
  // Flujo de inicio de sesion con google
  buttonGoogle.addEventListener('click', async () => {
    // Invocamos a la funcion loginWithGoogle que abre el popup de google
    const user = await loginWithGoogle();
    if (user !== undefined) {
      navigateTo('/feed');
    }
  });
  // Flujo de inicio de sesion con correo y contraseña
  // Declaramos un listener de tipo submit para el formulario
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Obtenemos los valores del input email y del input password
    const emailValue = email.value;
    const passwordValue = password.value;

    // Invocamos a la funcion login pasandole el email y la contraseña
    const user = await loginUser(emailValue, passwordValue);
    // Si firebase nos devuelve las credenciales del usuario de forma
    // satisfactoria navegamos al feed
    if (user !== undefined) {
      navigateTo('/feed');
    } else {
      loginForm.reset();
    }
  });
  return divContainer;
}

export default login;
