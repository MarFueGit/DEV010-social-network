import {
  fireEvent,
  getAllByPlaceholderText,
  getAllByTestId,
  getAllByText,
} from '@testing-library/dom';
import feed from '../../src/views/feed';

beforeAll(() => {
  // mock del diálogo
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});
// Mock de la libreria firebase/firestore
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  orderBy: jest.fn(),
  query: jest.fn(),
  getFirestore: jest.fn(),
  // onSnaptshot regresa o retorna una coleccion de post de la BD
  onSnapshot: jest.fn((query, callback) => {
    const querySnapshot = [
      {
        // cada objeto que retorna debe tener la misma estructura que tenemos en la BD
        data: () => ({
          Content: 'Este es un ejemplo',
          Date: {
            seconds: 1694173047,
            nanoseconds: 712000000,
            toDate: () => new Date(),
          },
          Type: 'Recipe',
          UserID: '1',
          UserName: 'maricela fuentes',
          Likes: [],
        }),
      },
      {
        data: () => ({
          Content: 'Este es un ejemplo 2',
          Date: {
            seconds: 1694173047,
            nanoseconds: 712000000,
            toDate: () => new Date(),
          },
          Type: 'Workout',
          UserID: '1',
          UserName: 'maricela fuentes',
          Likes: ['GDuTccfHlHRvDffZM1Ctd1t0wtE2'],
        }),
      },
    ];
    return callback(querySnapshot); // retornamos el callback con las post
  }),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  arrayRemove: jest.fn(),
  arrayUnion: jest.fn(),
}));

/*
Realizamos el mock de la funcion alert
 */
global.alert = jest.fn();
global.console = { log: jest.fn() };

describe('Feed', () => {
  it('Renderiza feed y muestra post', async () => {
    const navigateTo = jest.fn();
    const user = {
      displayName: 'maricela fuentes',
      email: 'maricelafuentes100@gmail.com',
      uid: 'GDuTccfHlHRvDffZM1Ctd1t0wtE2',
    };
    // al renderizar feed, le debemos pasar navigateTo y el usuario
    const container = feed(navigateTo, user);

    expect(container).not.toBeUndefined();
  });

  it('renderiza feed, muestra post y da like a alguno que no le haya dado like antes', async () => {
    const navigateTo = jest.fn();
    const user = {
      displayName: 'maricela fuentes',
      email: 'maricelafuentes100@gmail.com',
      uid: 'GDuTccfHlHRvDffZM1Ctd1t0wtE2',
    };
    // al renderizar feed, le debemos pasar navigateTo y el usuario
    const container = feed(navigateTo, user);
    // mandamos a traer todos los botones de like que se hayan renderizado en los post
    // para eso le puse un testId al boton de los likes
    const buttonLike = getAllByTestId(container, 'likeButton');
    // Damos click en dar like, en la posicion 0,
    // solo queremos darle like al primero, por eso ponemos [0]
    fireEvent(buttonLike[0], new MouseEvent('click', {}));
    expect(container).not.toBeUndefined();
  });

  it('renderiza feed, muestra post y quita like a alguno que ya le haya dado', async () => {
    const navigateTo = jest.fn();
    const user = {
      displayName: 'maricela fuentes',
      email: 'maricelafuentes100@gmail.com',
      uid: 'GDuTccfHlHRvDffZM1Ctd1t0wtE2',
    };
    // al renderizar feed, le debemos pasar navigateTo y el usuario
    const container = feed(navigateTo, user);
    // mandamos a traer todos los botones de like que se hayan renderizado en los post
    // para eso le puse un testId al boton de los likes
    const buttonsLikes = getAllByTestId(container, 'likeButton');
    // Damos click en dar like, en la posicion 0, solo queremos darle like al primero
    fireEvent(buttonsLikes[1], new MouseEvent('click', {}));
    expect(container).not.toBeUndefined();
  });

  it('renderiza feed, muestra post y edita un post publicado', async () => {
    const navigateTo = jest.fn();
    const user = {
      displayName: 'maricela fuentes',
      email: 'maricelafuentes100@gmail.com',
      uid: 'GDuTccfHlHRvDffZM1Ctd1t0wtE2',
    };
    // al renderizar feed, le debemos pasar navigateTo y el usuario
    const container = feed(navigateTo, user);
    // mandamos a traer todos los menus de mis post que se hayan renderizado
    // para eso le puse un placeholder al select, llamado: Options Post
    const menus = getAllByPlaceholderText(container, 'Options Post');
    // Damos click al menu en la posicion 0 y seleccionamos editar post, osea al primero menu ...
    fireEvent.change(menus[0], { target: { value: 'Edit post' } });
    // Mando a traer todos los botones save que esten activos, en este caso solo hay uno
    // que tengan como titlo en elboton: Save changes
    const buttonsSave = getAllByText(container, 'Save changes');
    // Damos click en el boton save para guardar cambios, al boton en posicion [0]
    fireEvent(buttonsSave[0], new MouseEvent('click', {}));
    expect(container).not.toBeUndefined();
  });

  it('renderiza feed, muestra post y borra un post publicado', async () => {
    const navigateTo = jest.fn();
    const user = {
      displayName: 'maricela fuentes',
      email: 'maricelafuentes100@gmail.com',
      uid: 'GDuTccfHlHRvDffZM1Ctd1t0wtE2',
    };

    const container = feed(navigateTo, user);

    const menus = getAllByPlaceholderText(container, 'Options Post');
    fireEvent.change(menus[1], { target: { value: 'Delete post' } });
    const dialog = getAllByTestId(container, 'dialog');
    const deleteButton = getAllByText(dialog[0], 'Yes');
    fireEvent(deleteButton[0], new MouseEvent('click', {}));
    expect(container).not.toBeUndefined();
  });
});
// });
