import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase';

// Funcion para crear nuevos usuarios, recibe el email y la contraseña
const signUpUser = async (email, password) => {
  try {
    // Invocamos al servicio de firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return userCredential;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('This email is already in use');
    } else if (error.code === 'auth/invalid-email') {
      alert('Invalid email, please  try again');
    } else if (error.code === 'auth/weak-password') {
      alert('Your password is too short, please try again');
    } else if (error.code) {
      alert('Something went wrong, please try again');
    }
    return undefined;
  }
};
// Funcion para loguear usuario, recibe email y contraseña
const loginUser = async (email, password) => {
  try {
    // Invocamos el servicio de firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return userCredential;
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      alert('Your password is wrong, please try again');
    } else if (error.code === 'auth/user-not-found') {
      alert('You are not signed up yet'); // Añadir botón de registro como mejorra
    } else if (error.code === 'auth/invalid-email') {
      alert('Invalid email, please try again');
    } else if (error.code) {
      alert('Something went wrong, please try again');
    }
    return undefined;
  }
};

const loginWithGoogle = async () => {
  try {
    // Inicializamos googleAuth
    const provider = new GoogleAuthProvider();
    // Invocamos el modal de iniciar sesion con google
    const userCredential = await signInWithPopup(auth, provider);

    return userCredential;
  } catch (error) {
    return undefined;
  }
};
const validateUserSession = (navigateTo) => {
  // Detecta el estado de autentificación
  // Este observador de firebase nos sirve para validar si el usuario ya habia iniciado sesion
  // o ya se habia registrado, en este caso navegamos a feed.
  onAuthStateChanged(auth, (user) => {
    if (user && window.location.pathname === '/feed') {
      // que no mande siempre a feed con usuario logeado
      navigateTo('/feed');
    } else if (!user && window.location.pathname === '/feed') {
      // que no mande siempre a login sin usuario logeado
      alert('Please, sign in to see posts');
      navigateTo('/login');
    }
  });
};

// Funcion para resetear la contraseña del usuario
const resetPasswordUser = async (email) => {
  try {
    // Invocamos al metodo resetPasswordResetEmail, el cual envia un link
    // al correo del usuario para resetear su contraseña
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    return undefined;
  }
};
export {
  signUpUser,
  loginUser,
  loginWithGoogle,
  validateUserSession,
  resetPasswordUser,
};
