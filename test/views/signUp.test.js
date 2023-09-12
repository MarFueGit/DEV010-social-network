import { fireEvent, getByTestId, getByText } from '@testing-library/dom';
import signUp from '../../src/views/signUp';

/* Realizamos el mock del archivo auth.js, esto se hace para que jest conozca
  que funcion va a ejecutar
  Para realizar este mock primero escribimos la ruta del archivo
  Despues retornamos una funcion con el mismo nombre de la funcion original signUpUser
  Por ultimo retornamos una promesa exitosa
*/
jest.mock('../../src/lib/auth.js', () => ({
  signUpUser: jest.fn().mockResolvedValue({ name: 'marysela' }),
  updateCurrentUser: jest.fn().mockResolvedValue(true),
}));
/*
Realizamos el mock de la funcion alert
 */
global.alert = jest.fn();
global.console = { log: jest.fn() };

describe('view signUp', () => {
  it('renderiza signUp', () => {
    const container = signUp();
    expect(container).not.toBeUndefined();
  });
  // Utilizamos testing librery para testear los eventos del DOM
  it('renderiza a signUp y da click a volver', () => {
    // Para mandar a llamar a signUp, hicimos un mock de la funcion navigateTo
    // Esto lo hacemos con jest.fn
    const navigateTo = jest.fn();
    const container = signUp(navigateTo);
    // Referenciamos una nueva variable button con getByText, usando testing-library
    // La funcion getByText recibe un contenedor que es todo nuestro signUp del DOM
    // y un texto por el cual buscar, buscamos el button llamado Volver
    const button = getByText(container, 'Back');
    // Utilizamos fireEvent para lanzar un evento de tipo click, aplicamos este evento al button
    fireEvent(button, new MouseEvent('click', {}));
    expect(container).not.toBeUndefined();
  });
  it('renderiza signUp y registramos un usuario correcto', () => {
    // Para mandar a llamar a signUp, hicimos un mock de la funcion navigateTo
    // Esto lo hacemos con jest.fn
    const navigateTo = jest.fn();
    const container = signUp(navigateTo);
    // referenciamos el formulario a travez de data-testId = form-input
    const form = getByTestId(container, 'form-input');
    // Referenciamos todos los campos del formulario por medio de su data-testId.
    const name = getByTestId(container, 'name');
    const lastName = getByTestId(container, 'lastName');
    const email = getByTestId(container, 'email');
    const password = getByTestId(container, 'password');
    const confirmPassword = getByTestId(container, 'confirmPassword');
    // Vamos llenando cada campo del formulario con esos valores por medio del evento change
    // que simula estar escribiendo con el teclado en el input
    fireEvent.change(name, { target: { value: 'marysela' } });
    fireEvent.change(lastName, { target: { value: 'vasques' } });
    fireEvent.change(email, { target: { value: 'correoprueba@gmail.com' } });
    fireEvent.change(password, { target: { value: '123456789' } });
    fireEvent.change(confirmPassword, { target: { value: '123456789' } });
    fireEvent.submit(form);
    expect(container).not.toBeUndefined();
  });

  it('renderiza signUp y registramos un usuario con contraseña diferente', () => {
    // Para mandar a llamar a signUp, hicimos un mock de la funcion navigateTo
    // Esto lo hacemos con jest.fn
    const navigateTo = jest.fn();
    const container = signUp(navigateTo);
    // referenciamos el formulario a travez de data-testId = form-input
    const form = getByTestId(container, 'form-input');
    // Referenciamos todos los campos del formulario por medio de su data-testId.
    const name = getByTestId(container, 'name');
    const lastName = getByTestId(container, 'lastName');
    const email = getByTestId(container, 'email');
    const password = getByTestId(container, 'password');
    const confirmPassword = getByTestId(container, 'confirmPassword');
    // Vamos llenando cada campo del formulario con esos valores por medio del evento change
    // que simula estar escribiendo con el teclado
    fireEvent.change(name, { target: { value: 'marysela' } });
    fireEvent.change(lastName, { target: { value: 'vasques' } });
    fireEvent.change(email, { target: { value: 'correoprueba@gmail.com' } });
    fireEvent.change(password, { target: { value: '123456789' } });
    fireEvent.change(confirmPassword, { target: { value: '12345678' } });
    fireEvent.submit(form);
    expect(container).not.toBeUndefined();
  });
});
