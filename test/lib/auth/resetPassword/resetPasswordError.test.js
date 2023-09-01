import { resetPasswordUser } from '../../../../src/lib/auth';

beforeEach(() => {
  jest.resetModules();
});

jest.mock('firebase/auth', () => ({
  sendPasswordResetEmail: () =>
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
  it('resetPasswordUser error auth/user-not-found', () => {
    try {
      resetPasswordUser();
    } catch (error) {
      expect(error).toBe('');
    }
  });
});
