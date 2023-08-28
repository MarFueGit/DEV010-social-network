import { addDoc, collection, Timestamp } from 'firebase/firestore'; // falta  deleteDoc
import { db } from '../firebase.js';

const colRef = collection(db, 'Post');

function addPost() {
  const section = document.createElement('section');
  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Write your post here...';
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    addDoc(colRef, {
      // User: auth.currentUser.userValue,
      Date: Timestamp.now(), // agrega la fecha de creación al doc
      Content: textarea.value,
    });
    textarea.value = ''; // limpiar el contenido del textarea con el click en submit
  });
  section.append(textarea, submitButton);
  return section;
}

export default addPost;
