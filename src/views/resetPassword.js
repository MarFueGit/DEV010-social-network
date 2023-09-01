import { resetPasswordUser } from '../lib/auth';

function resetPassword(navigateTo) {
  //   <div class="contraseña-container">
  //    <img
  //    class="img1"
  //    src="../assets/img/logo-vitalhub (1)2.png"
  //    alt="imagen logo red social"
  //    />
  //     <p class="subtitle">
  //       ¿Olvidaste tu contraseña? No te preocupes, es posible recuperarla.
  //     </p>
  //     <form id="contraseña-form" data-testid="form-reset">
  //       <label class="label-password">Email</label>
  //       <input
  //         id="reset-password"
  //         type="email"
  //         name="email"
  //         placeholder="White your email"
  //         data-testid="input-reset"
  //         required
  //       />
  //       <button class="button-contraseña" type="submit">
  //         Recuperar Contraseña
  //       </button>
  //       <p>
  //         <a href="">Olvidalo, la he recordado</a>
  //       </p>
  //     </form>
  //   </div>;
  const contraseñaContainer = document.createElement('div');
  contraseñaContainer.classList.add('contraseña-container');
  const img = document.createElement('img');
  img.classList.add('img1');
  img.src = '../assets/img/logo-vitalhub (1)2.png';
  img.alt = 'logo vitalHub';
  contraseñaContainer.appendChild(img);
  const subtitle = document.createElement('p');
  subtitle.classList.add('subtitle');
  subtitle.textContent =
    '¿Olvidaste tu contraseña? No te preocupes, es posible recuperarla.';
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
  buttonContraseña.textContent = 'Recuperar Contraseña';
  form.appendChild(buttonContraseña);
  const p = document.createElement('p');
  const a = document.createElement('a');
  a.textContent = 'Olvidalo, la he recordado';
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
      alert('Hemos enviado un link a tu correo para recuperar tu contraseña');
      navigateTo('/login');
    } else {
      // Si hubo un error reseteamos el formulario
      alert('Hubo un error al recuperar tu contraseña');
      form.reset();
    }
  });
  contraseñaContainer.appendChild(form);
  return contraseñaContainer;
}

export default resetPassword;
