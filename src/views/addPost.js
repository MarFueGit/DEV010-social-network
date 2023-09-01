import { addDoc, collection, Timestamp } from 'firebase/firestore'; // falta  deleteDoc
import { db, auth } from '../firebase.js';

const colRef = collection(db, 'Post');

function addPost(doc) {
  const section = document.createElement('section'); // contiene textarea, select y submit button
  if (auth.currentUser != null) {
    // se ejecuta sólo si hay usuario loggeado
    const user = auth.currentUser;
    console.log(user);
    const userID = user.uid;
    console.log(userID);

    const select = document.createElement('select'); // para seleccionar tipo de post
    select.placeholder = 'Choose one';
    const option1 = document.createElement('option');
    option1.textContent = 'Recipe';
    option1.value = 'Recipe';
    const option2 = document.createElement('option');
    option2.textContent = 'Workout';
    option2.value = 'Workout';
    select.append(option1, option2);
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Write your post here...';
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';

    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (textarea.value !== '') {
        addDoc(colRef, {
          // User: auth.currentUser.userValue,
          Date: Timestamp.now(), // agrega la fecha de creación al doc
          Content: textarea.value,
          Type: select.options[select.selectedIndex].text, // toma texto de la  opción seleccionada
          UserID: userID, // guarda el ID del usuario que escribió el post
          UserName: user.displayName,
        });
      } else {
        alert('Please, write something to continue');
      }
      textarea.value = ''; // limpiar el contenido del textarea con el click en submit
    });
    // prueba para editar post en el mismo textarea
    // importar la opción seleccionada en una variable
    if (doc.data().UserName === auth.currentUser.displayName) {
      const selectPost = document.createElement('select'); // mover esto a feed por cada post
      const editOption = document.createElement('option'); // mover esto a feed por cada post
      const deleteOption = document.createElement('option'); // mover esto a feed por cada post
      selectPost.placeholder = '...'; // mover esto a feed por cada post
      editOption.textContent = 'Edit post'; // mover esto a feed por cada post
      deleteOption.textContent = 'Delete post'; // mover esto a feed por cada post
      selectPost.append(editOption, deleteOption); // mover esto a feed por cada post

      if (select.selectedIndex === 0) {
        textarea.textContent = doc.data().Content;
        submitButton.textContent = 'Save changes';
        // updateDoc
      }
    }
    // termina prueba para editar post en el mismo textarea
    section.append(select, textarea, submitButton);
  } else {
    const p = document.createElement('p');
    const button = document.createElement('button');
    p.textContent = 'Please, sign in to see posts';
    button.addEventListener('click', (navigateTo) => {
      navigateTo.preventDefault();
      navigateTo('/login');
    });
    section.append(p, button);
  }
  return section;
}

export default addPost;
