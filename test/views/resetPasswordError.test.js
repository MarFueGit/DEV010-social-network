import { fireEvent, getByTestId } from '@testing-library/dom';
import resetPassword from '../../src/views/resetPassword';

/* Realizamos el mock del archivo auth.js, esto se hace para que jest conozca
  que funcion va a ejecutar
  Para realizar este mock primero escribimos la ruta del archivo
  Despues retornamos una funcion con el mismo nombre de la funcion original signUpUser
  Por ultimo retornamos una promesa exitosa
*/
jest.mock('../../src/lib/auth.js', () => ({
  resetPasswordUser: jest.fn().mockResolvedValue(undefined),
}));

/*
  Realizamos el mock de la funcion alert
   */
global.alert = jest.fn();
describe('view resetPassword Error', () => {
  it('renderiza resetPassword y reseteamos contraseña error', () => {
    // Para mandar a llamar a resetPassword, hicimos un mock de la funcion navigateTo
    // Esto lo hacemos con jest.fn
    const navigateTo = jest.fn();
    const container = resetPassword(navigateTo);
    // referenciamos el formulario a travez de data-testId = form-reset
    const form = getByTestId(container, 'form-reset');
    // Referenciamos todos los campos del formulario por medio de su data-testId.
    const email = getByTestId(container, 'input-reset');
    // Vamos llenando cada campo del formulario con esos valores por medio del evento change
    // que simula estar escribiendo con el teclado en el input
    fireEvent.change(email, { target: { value: 'correoprueba@gmail.com' } });
    fireEvent.submit(form);
    expect(container).not.toBeUndefined();
  });
});
