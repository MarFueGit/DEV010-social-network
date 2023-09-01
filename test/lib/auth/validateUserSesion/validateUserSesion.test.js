import { validateUserSession } from '../../../../src/lib/auth';

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

  // container for attached callbacks and state variables
  const authChangeCallbacks = [];
  let authCurrentUserInfo = mockedUserInfo;

  // invoke all callbacks with current data
  const fireOnChangeCallbacks = () => {
    authInstance.currentUser = authCurrentUserInfo;
    authChangeCallbacks.forEach((cb) => {
      try {
        cb(mockedUserInfo); // invoke any active listeners
      } catch (err) {
        console.error('Error invoking callback', err);
      }
    });
  };

  authInstance.signOut = () => {
    // signInWithX will look similar to this
    authCurrentUserInfo = null;
    fireOnChangeCallbacks();
  };

  return {
    getAuth: jest.fn(() => authInstance),
    onAuthStateChanged: jest.fn((authMock, onChangeCallback) => {
      onChangeCallback(mockedUserInfo);
    }),
  };
});

global.console = { log: jest.fn() };
describe('lib auth', () => {
  it('validateUserSession user exists', () => {
    const user = validateUserSession();
    expect(user).toBeUndefined();
  });
});
