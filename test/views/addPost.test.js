import {
  fireEvent,
  getByPlaceholderText,
  getByTestId,
  getByText,
} from '@testing-library/dom';
import addPost from '../../src/views/addPost';

// Mockeamos firebase/firestore
/* Se utiliza jest.fn() para crear funciones simuladas para addDoc,
collection y getFirestore. Luego, se utiliza mockResolvedValue para especificar
 que estas funciones simuladas deben devolver una promesa resuelta con el valor true. */
jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn().mockResolvedValue(true),
  collection: jest.fn().mockResolvedValue(true),
  getFirestore: jest.fn().mockResolvedValue(true),
}));

describe('view addPost', () => {
  it('renderiza addPost', () => {
    const container = addPost();
    expect(container).not.toBeUndefined();
  });

  it('renderiza addPost y llena los datos a publicar', async () => {
    const container = addPost();
    // referenciamos el boton submit para crear un nuevo post por medio de su texto
    const submitButton = getByText(container, 'Submit');
    // referenciamos el text area de la descripcion del nuevo post por medio de su placeholder
    const textArea = getByPlaceholderText(container, 'Write your post here...');
    // referenciamos el select del tipo del nuevo post por medio de su placeholder
    const selectTypePost = getByTestId(container, 'selectType');

    // agregamos un texto de prueba al text area, simulando que escribe
    fireEvent.change(textArea, {
      target: { value: 'Este es un post de prueba :)' },
    });
    // agregamos o seleccionamos un select del type Post
    fireEvent.change(selectTypePost, {
      target: { value: 'Recipe' },
    });

    // Damos click en submit para simular guardar el post
    fireEvent(submitButton, new MouseEvent('click', {}));

    // si todo salio bien, reseteamos el valor del textarea a vacio y verificamos con expect
    expect(textArea.value).toBe('');
  });

  it('renderiza addPost y llena los datos a publicar, pero sin seleccionar un select', async () => {
    const container = addPost();
    // referenciamos el boton submit para crear un nuevo post por medio de su texto
    const submitButton = getByText(container, 'Submit');
    // referenciamos el text area de la descripcion del nuevo post por medio de su placeholder
    const textArea = getByPlaceholderText(container, 'Write your post here...');

    // agregamos un texto de prueba al text area
    fireEvent.change(textArea, {
      target: { value: 'Este es un post de prueba :)' },
    });

    // Damos click en submit para simular guardar el post
    fireEvent(submitButton, new MouseEvent('click', {}));

    // si todo salio bien, revisamos que no haya reseteado el valor del textarea,
    // debido a que no seleccionamos ningun select
    expect(textArea.value).toBe('Este es un post de prueba :)');
  });

  it('renderiza addPost y llena los datos a publicar, pero sin escribir nada en el select', async () => {
    const container = addPost();
    // referenciamos el boton submit para crear un nuevo post por medio de su texto
    const submitButton = getByText(container, 'Submit');
    // referenciamos el text area de la descripcion del nuevo post por medio de su placeholder
    const textArea = getByPlaceholderText(container, 'Write your post here...');

    // Damos click en submit para simular guardar el post
    fireEvent(submitButton, new MouseEvent('click', {}));

    // si todo salio bien, revisamos que el valor del textarea este vacio, porque no escribimos nada
    expect(textArea.value).toBe('');
  });
});
