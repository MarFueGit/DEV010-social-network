import { loginUser } from '../../../../src/lib/auth';

beforeEach(() => {
  jest.resetModules();
});

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: () =>
    // Retornamos un error con throw para causar que entre en el cath,code es el mensaje descriptivo
    new Promise(() => {
      throw { code: true };
    }),
  getAuth: jest.fn(),
}));
/*
Realizamos el mock de la funcion alert
 */
global.alert = jest.fn();

describe('lib auth', () => {
  it('loginUser error default', () => {
    try {
      loginUser();
    } catch (error) {
      expect(error).toBe('');
    }
  });
});
