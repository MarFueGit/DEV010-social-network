// Importamos las imagenes
import logoVitalHub from '../assets/img/logo-vitalhub (1)2.png';

import { resetPasswordUser } from '../lib/auth';

function resetPassword(navigateTo) {
  const contraseñaContainer = document.createElement('div');
  contraseñaContainer.classList.add('contraseña-container');
  const img = document.createElement('img');
  img.classList.add('img1');
  img.src = logoVitalHub;
  img.alt = 'logo vitalHub';
  contraseñaContainer.appendChild(img);
  const subtitle = document.createElement('p');
  subtitle.classList.add('subtitle');
  subtitle.textContent =
    'Did you forget your password? Do not worry, we can help you!';
  contraseñaContainer.appendChild(subtitle);
  const form = document.createElement('form');
  form.setAttribute('id', 'contraseña-form');
  form.setAttribute('data-testid', 'form-reset');
  const labelPassword = document.createElement('label');
  labelPassword.classList.add('label-password');
  labelPassword.textContent = 'Email';
  form.appendChild(labelPassword);
  const input = document.createElement('input');
  input.setAttribute('id', 'reset-password');
  input.setAttribute('type', 'email');
  input.setAttribute('name', 'email');
  input.setAttribute('placeholder', 'Write your email');
  input.setAttribute('data-testid', 'input-reset');
  input.setAttribute('required', '');
  form.appendChild(input);
  const buttonContraseña = document.createElement('button');
  buttonContraseña.classList.add('button-contraseña');
  buttonContraseña.setAttribute('type', 'submit');
  buttonContraseña.textContent = 'Recover my password';
  form.appendChild(buttonContraseña);
  const p = document.createElement('p');
  const a = document.createElement('a');
  a.textContent = 'I remembered my password';
  a.addEventListener('click', () => {
    navigateTo('/login');
  });
  p.appendChild(a);
  form.appendChild(p);
  // Agregamos el evento del form
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Invocamos a la funcion resetPasswordUser y le pasamos el valor del input del email
    const passwordReset = await resetPasswordUser(input.value);
    // Si todo sale bien navegamos al login
    if (passwordReset !== undefined) {
      alert('We have sent a link to your email for recover your password');
      navigateTo('/login');
    } else {
      // Si hubo un error reseteamos el formulario
      alert('Oh, no! Please try again');
      form.reset();
    }
  });
  contraseñaContainer.appendChild(form);
  return contraseñaContainer;
}

export default resetPassword;
