import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
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
    localStorage.setItem('user', userCredential);

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
const validateUserSession = () => {
  // Detecta el estado de autentificación
  // Este observador de firebase nos sirve para validar si el usuario ya habia iniciado sesion
  // o ya se habia registrado, en este caso navegamos a feed.
  onAuthStateChanged(auth, (user) => {
    console.log('user:', user);
    return user;
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

const signOutUser = async () => {
  // función para cierre de sesión, no testeada aún

  try {
    // función para cierre de sesión, no testeada aún
    return await signOut(auth);
  } catch (error) {
    return alert('Something wrong happened, please try again.');
  }
  // termina función de cierre de sesión
};

// Funcion para actualizar el usuario
const updateCurrentUser = async (completeUserName) => {
  await updateProfile(auth.currentUser, { displayName: completeUserName });
};
export {
  signUpUser,
  loginUser,
  loginWithGoogle,
  validateUserSession,
  resetPasswordUser,
  signOutUser,
  updateCurrentUser,
};
