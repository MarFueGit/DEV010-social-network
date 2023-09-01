import { loginWithGoogle } from '../../../../src/lib/auth';

jest.mock('firebase/auth', () => ({
  GoogleAuthProvider: class MockGoogle {
    constructor() {
      console.log('');
    }
  },
  signInWithPopup: () => new Promise((resolve) => resolve({ user: 'Mary' })),
  getAuth: jest.fn(),
}));
global.console = { log: jest.fn() };
describe('lib auth', () => {
  it('loginWithGoogle', () => {
    const user = loginWithGoogle();
    expect(user).not.toBeUndefined();
  });
});
