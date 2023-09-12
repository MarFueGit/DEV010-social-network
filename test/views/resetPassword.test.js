import { fireEvent, getByTestId, getByText } from '@testing-library/dom';
import resetPassword from '../../src/views/resetPassword';

/* Realizamos el mock del archivo auth.js, esto se hace para que jest conozca
  que funcion va a ejecutar
  Para realizar este mock primero escribimos la ruta del archivo
  Despues retornamos una funcion con el mismo nombre de la funcion original signUpUser
  Por ultimo retornamos una promesa exitosa
*/
// La función mockResolvedValuese utiliza en Jest para crear una función simulada (mock)
// que devuelve una promesa resuelta con un valor específico.
jest.mock('../../src/lib/auth.js', () => ({
  resetPasswordUser: jest.fn().mockResolvedValue(true),
}));

/*
  Realizamos el mock de la funcion alert
   */
global.alert = jest.fn();
describe('view resetPassword', () => {
  it('renderiza resetPassword', () => {
    const container = resetPassword();
    expect(container).not.toBeUndefined();
  });

  it('renderiza a resetPassword y Olvidalo, la he recordado', () => {
    // Para mandar a llamar a resetPassword, hicimos un mock de la funcion navigateTo
    // Esto lo hacemos con jest.fn
    const navigateTo = jest.fn();
    const container = resetPassword(navigateTo);
    // Referenciamos una nueva variable button con getByText, usando testing-library
    // La funcion getByText recibe un contenedor que es todo nuestro signUp del DOM
    // y un texto por el cual buscar, buscamos el button llamado Volver
    const button = getByText(container, 'I remembered my password');
    // Utilizamos fireEvent para lanzar un evento de tipo click, aplicamos este evento al button
    fireEvent(button, new MouseEvent('click', {}));
    expect(container).not.toBeUndefined();
  });
  it('renderiza resetPassword y reseteamos contraseña', () => {
    // Para mandar a llamar a resetPassword, hicimos un mock de la funcion navigateTo
    // Esto lo hacemos con jest.fn
    const navigateTo = jest.fn();
    const container = resetPassword(navigateTo);
    // referenciamos el formulario a travez de data-testId = form-reset
    const form = getByTestId(container, 'form-reset');
    // Referenciamos todos los campos del formulario por medio de su data-testId.
    const email = getByTestId(container, 'input-reset');
    // Vamos llenando cada campo del formulario con esos valores por medio del evento change
    // que simula estar escribiendo con el teclado
    fireEvent.change(email, { target: { value: 'correoprueba@gmail.com' } });
    fireEvent.submit(form);
    expect(container).not.toBeUndefined();
  });
});
