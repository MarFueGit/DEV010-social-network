import { loginUser } from '../../../../src/lib/auth';

beforeEach(() => {
  jest.resetModules();
});

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: () =>
    // Retornamos un error con throw para causar que entre en el cath
    new Promise(() => {
      throw { code: 'auth/wrong-password' };
    }),
  getAuth: jest.fn(),
}));
/*
Realizamos el mock de la funcion alert
 */
global.alert = jest.fn();

describe('lib auth', () => {
  it('loginUser error auth/wrong-password', () => {
    try {
      loginUser();
    } catch (error) {
      expect(error).toBe('');
    }
  });
});
