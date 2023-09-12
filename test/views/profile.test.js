import { fireEvent, getByText } from '@testing-library/dom';
import profile from '../../src/views/profile';

global.console = { log: jest.fn() };
describe('profile', () => {
  it('renderiza el profile', () => {
    const navigateTo = jest.fn();
    const user = {
      displayName: 'maricela fuentes',
      email: 'maricelafuentes100@gmail.com',
      uid: 'GDuTccfHlHRvDffZM1Ctd1t0wtE2',
    };
    const container = profile(navigateTo, user);

    expect(container).not.toBeUndefined();
  });
  it('renderiza profile y da click en cerrar sesion', () => {
    const navigateTo = jest.fn();
    const user = {
      displayName: 'maricela fuentes',
      email: 'maricelafuentes100@gmail.com',
      uid: 'GDuTccfHlHRvDffZM1Ctd1t0wtE2',
    };
    const container = profile(navigateTo, user);
    // Referenciamos una nueva variable button con getByText, usando testing-library
    // La funcion getByText recibe un contenedor que es todo nuestro signUp del DOM
    // y un texto por el cual buscar, buscamos el button llamado Volver
    const button = getByText(container, 'Sign Out');
    // Utilizamos fireEvent para lanzar un evento de tipo click, aplicamos este evento al button
    fireEvent(button, new MouseEvent('click', {}));
    expect(container).not.toBeUndefined();
  });
});
