import { loginUser } from '../../../../src/lib/auth';

beforeEach(() => {
  jest.resetModules();
});

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: () =>
    // Retornamos un error con throw para causar que entre en el cath
    new Promise(() => {
      throw { code: 'auth/user-not-found' };
    }),
  getAuth: jest.fn(),
}));
/*
Realizamos el mock de la funcion alert
 */
global.alert = jest.fn();

describe('lib auth', () => {
  it('loginUser error auth/user-not-found', () => {
    try {
      loginUser();
    } catch (error) {
      expect(error).toBe('');
    }
  });
});
