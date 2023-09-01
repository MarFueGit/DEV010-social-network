import { loginWithGoogle } from '../../../../src/lib/auth';

jest.mock('firebase/auth', () => ({
  GoogleAuthProvider: class MockGoogle {
    constructor() {
      console.log('');
    }
  },
  signInWithPopup: () =>
    new Promise(() => {
      throw { code: 'auth/wrong-password' };
    }),
  getAuth: jest.fn(),
}));
global.console = { log: jest.fn() };
describe('lib auth', () => {
  it('loginWithGoogle error', () => {
    const user = loginWithGoogle();
    expect(user).not.toBeUndefined();
  });
});
