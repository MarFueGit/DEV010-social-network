import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from 'firebase/firestore'; // DocumentReference
import { db } from '../firebase.js';

// filter ahora recibirá el usuario que viene del observador y la ruta a renderizar
// para no tener que usar window.location y asi testear mas facil
function filter(user, route) {
  const fatherContainer = document.createElement('section');
  const postsContainer = document.createElement('section');

  if (route === '/recipes') {
    const q = query(
      collection(db, 'Post'),
      orderBy('Date', 'desc'),
      where('Type', '==', 'Recipe'),
    );
    onSnapshot(q, (querySnapshot) => {
      postsContainer.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const onePost = document.createElement('section');
        onePost.className = 'individual-post';
        const typePost = document.createElement('p');
        typePost.classList.add('type-post');
        const datePost = document.createElement('p');
        datePost.classList.add('date-post');
        const postContent = document.createElement('p');
        postContent.classList.add('post-content');
        const userName = document.createElement('p');
        userName.classList.add('user-name');

        userName.textContent = doc.data().UserName;
        typePost.textContent = doc.data().Type;
        datePost.textContent = doc.data().Date.toDate().toLocaleDateString();
        postContent.textContent = doc.data().Content;

        onePost.append(userName, typePost, datePost, postContent);
        postsContainer.append(onePost);
      });
    });
    fatherContainer.appendChild(postsContainer);
  } else if (route === '/workout') {
    const q = query(
      collection(db, 'Post'),
      orderBy('Date', 'desc'),
      where('Type', '==', 'Workout'),
    );
    onSnapshot(q, (querySnapshot) => {
      postsContainer.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const onePost = document.createElement('section');
        onePost.className = 'individual-post';
        const typePost = document.createElement('p');
        typePost.classList.add('type-post');
        const datePost = document.createElement('p');
        datePost.classList.add('date-post');
        const postContent = document.createElement('p');
        postContent.classList.add('post-content');
        const userName = document.createElement('p');
        userName.classList.add('user-name');

        userName.textContent = doc.data().UserName;
        typePost.textContent = doc.data().Type;
        datePost.textContent = doc.data().Date.toDate().toLocaleDateString();
        postContent.textContent = doc.data().Content;

        onePost.append(userName, typePost, datePost, postContent);
        postsContainer.append(onePost);
      });
    });
    fatherContainer.appendChild(postsContainer);
  } else if (route === '/profile') {
    const q = query(
      collection(db, 'Post'),
      orderBy('Date', 'desc'),
      where('UserID', '==', user?.uid),
    );
    onSnapshot(q, (querySnapshot) => {
      postsContainer.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const onePost = document.createElement('section');
        onePost.className = 'individual-post';
        const typePost = document.createElement('p');
        typePost.classList.add('type-post');
        const datePost = document.createElement('p');
        datePost.classList.add('date-post');
        const postContent = document.createElement('p');
        postContent.classList.add('post-content');
        const userName = document.createElement('p');
        userName.classList.add('user-name');

        userName.textContent = doc.data().UserName;
        typePost.textContent = doc.data().Type;
        datePost.textContent = doc.data().Date.toDate().toLocaleDateString();
        postContent.textContent = doc.data().Content;

        onePost.append(userName, typePost, datePost, postContent);
        postsContainer.append(onePost);
      });
    });
    fatherContainer.appendChild(postsContainer);
  }

  return fatherContainer;
}

export default filter;
