import { updateCurrentUser } from '../../../src/lib/auth';

/**
 * Firebase Auth Module
 */
jest.mock('firebase/auth', () => {
  const authInstance = {
    currentUser: null,
  };

  const mockedUserInfo = Object.freeze({
    email: 'example@example.com',
  });

  // contenedor de callbacks y variables de estado adjuntas
  const authChangeCallbacks = [];
  let authCurrentUserInfo = mockedUserInfo;

  // invocar todas las retrollamadas con los datos actuales
  const fireOnChangeCallbacks = () => {
    authInstance.currentUser = authCurrentUserInfo;
    authChangeCallbacks.forEach((cb) => {
      try {
        cb(mockedUserInfo); // invocar a los oyentes activos
      } catch (err) {
        console.error('Error invoking callback', err);
      }
    });
  };

  authInstance.signOut = () => {
    // signInWithX tendrá un aspecto similar al siguiente
    authCurrentUserInfo = null;
    fireOnChangeCallbacks();
  };

  return {
    // Mock para currentUser
    getAuth: jest.fn(() => authInstance),
    onAuthStateChanged: jest.fn((authMock, onChangeCallback) => {
      onChangeCallback(mockedUserInfo);
    }),
    // mock para updateProfile
    updateProfile: () => new Promise((resolve) => resolve(true)),
  };
});

describe('lib auth', () => {
  it('updateCurrentUser', () => {
    const user = updateCurrentUser();
    expect(user).not.toBeUndefined();
  });
});
