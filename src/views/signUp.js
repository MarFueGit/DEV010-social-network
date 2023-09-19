// Importamos las imagenes
import logoVitalHub from '../assets/img/logo-vitalhub (1)2.png';
import { signUpUser, updateCurrentUser } from '../lib/auth';

function signUp(navigateTo) {
  const divContainer = document.createElement('div');
  divContainer.classList.add('container-input');
  divContainer.innerHTML = `
    <button class="return">Back</button>
    <img
    class="img2"
        src="${logoVitalHub}" 
        alt="imagen logo red social"
        />
        <h2 class="title">Welcome!</h2>
        <form class="form-input" action="" onsubmit="" data-testid="form-input">
            <label for="">First name</label>
            <input type="text" name="name" placeholder="Write you first name" required  data-testid="name"/>
         
            <label for="">Last name</label>
            <input type="text" name="lastName" placeholder="Write your last name" required data-testid="lastName"/>
         
            <label for="">Email</label>
            <input type="email" name="email" placeholder="Write your email"  required  data-testid="email"/>
         
            <label for="">Password</label>
            <input type="password" name="password" minlength="6" maxlength="10" placeholder="Write your password" required data-testid="password"/>
         
            <label for="">Confirm your password</label>
            <input type="password" name="confirmPassword" minlength="6" maxlength="10" placeholder="Write your password again" required data-testid="confirmPassword"/>
          <div>
            <button id="button-signup" type="submit">Sign up!</button>
        </div>
          </form>
    `;

  const backButton = divContainer.querySelector('.return');
  backButton.addEventListener('click', () => {
    navigateTo('/login');
  });
  // const inputName = divContainer.querySelector('input[name="name"]');
  // const inputLastName = divContainer.querySelector('input[name="lastName"]');
  const inputEmail = divContainer.querySelector('input[name="email"]');
  const inputPassword = divContainer.querySelector('input[name="password"]');
  const inputConfirmPassword = divContainer.querySelector(
    'input[name="confirmPassword"]',
  );
  const inputUserName = divContainer.querySelector('input[name="name"]');
  const inputUserLastName = divContainer.querySelector(
    'input[name="lastName"]',
  );

  const formInput = divContainer.querySelector('.form-input');
  formInput.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;
    const passwordConfirmValue = inputConfirmPassword.value;
    const userName = inputUserName.value.toString();
    console.log(userName);
    const userLastName = inputUserLastName.value.toString();
    const space = ' ';
    const completeUserName = userName + space + userLastName;
    console.log(userLastName);

    // const colRef = collection(db, 'Post');

    // Validamos que ambas contraseñas sean iguales
    if (passwordValue !== passwordConfirmValue) {
      formInput.reset();
      return alert('Passwords are not the same');
    }
    const newUser = await signUpUser(emailValue, passwordValue);
    if (newUser !== undefined) {
      // navigateTo('/feed');
      await updateCurrentUser(completeUserName);
      alert('Now, you are signed up, please login to continue');
      navigateTo('/login'); // navega a login para que el usuario inicie sesión
    }
    return formInput.reset();
  });

  return divContainer;
}

export default signUp;
