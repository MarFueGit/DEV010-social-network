import {
  collection,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
  deleteDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../firebase.js';
import addPost from './addPost.js'; // textarea y botón de submit
import navigationBar from './navigationBar.js';

function feed(navigateTo, user) {
  console.log('user desde feed:', user);
  const userID = user?.uid;
  const divTitle = document.createElement('div'); // body del feed o contenedor padre
  // Usamos el operador ternario para que no marque error cuando user sea nullo
  const currentUserName = user?.displayName; // nombre el usuario loggeado
  divTitle.classList.add('divTitle'); // Agregamos la clase divTitle al contenedor padre
  const header = document.createElement('header'); // header del feed
  header.classList.add('header'); // Agregamos la clase header al header

  const titleFeed = document.createElement('h1');
  titleFeed.textContent = 'Feed';
  titleFeed.classList.add('titleFeed');

  const img3 = document.createElement('img');
  img3.classList.add('img3');
  img3.src = '../assets/img/logo-vitalhub.png';
  // Esto es otra forma de meter la imagen
  //  img3.setAtributte('src', '../assets/img/logo-vitalhub.png')
  img3.alt = 'logo vitalHub';
  // img3.setAtributte('alt', 'logo vitalHub')
  const footer = document.createElement('footer');
  header.append(titleFeed, img3);

  // Query a firestore a la tabla o coleccion Post ordenando por descendente
  const q = query(collection(db, 'Post'), orderBy('Date', 'desc'));
  // select * from Post order by Date desc;
  const sectionPosts = document.createElement('section'); // Section para los post
  sectionPosts.classList.add('sectionPosts');
  sectionPosts.appendChild(addPost()); // addPost() es la vista para agregar post

  const postsContainer = document.createElement('section');

  onSnapshot(q, (querySnapshot) => {
    postsContainer.innerHTML = ''; // para evitar que se dupliquen las publicaciones con el submit
    querySnapshot.forEach((doc) => {
      const onePost = document.createElement('section'); // sección individual post, para formato
      onePost.className += 'individual-post'; // asigna clase a posts individuales

      const typePost = document.createElement('p'); // tipo de post (receta o ejercicio)
      typePost.classList.add('type-post');
      const datePost = document.createElement('p');
      datePost.classList.add('date-post'); // fecha del post (cambiar formato)
      const postContent = document.createElement('p');
      postContent.classList.add('post-content'); // contenido del post
      const userName = document.createElement('p'); // usuario que crea el post
      userName.classList.add('user-name');

      // a traves de la funcion data() obtenemos el valor de UserName
      userName.textContent = doc.data().UserName;
      typePost.textContent = doc.data().Type;
      datePost.textContent = doc.data().Date.toDate().toLocaleDateString();
      postContent.textContent = doc.data().Content;

      // Componente likes
      const likeButton = document.createElement('i');
      likeButton.classList.add('fa-regular');
      likeButton.classList.add('fa-heart');
      // PRUEBA MARI
      likeButton.classList.add('likeButton');
      // likeButton.style.color = '#CDDC39';
      likeButton.style.fontSize = '25px';
      // likeButton.classList.add('unliked');
      // Agregamos atributo testId para testear
      likeButton.setAttribute('data-testid', 'likeButton');
      const likesText = document.createElement('span');
      const likesCount = document.createElement('span');
      likesText.textContent = ' Likes';
      // puse ?, para que sino trae la propiedad Likes no quiebre el codigo
      const likesArray = doc.data()?.Likes;
      // Renderizamos icono, de acuerdo a si el usuario dio like o no dio like
      if (likesArray.includes(userID)) {
        // Icono lleno
        likeButton.classList.add('fa-solid');
        likeButton.classList.add('fa-heart');
        likeButton.classList.add('liked');
      } else {
        // icono vacio
        likeButton.classList.add('fa-regular');
        likeButton.classList.add('fa-heart');
        likeButton.classList.add('unliked');
      }
      const likeContainer = document.createElement('section');
      // Si el array de likes es undefined, osea no existe o esta vacio le ponemos 0 likes
      if (likesArray === undefined || likesArray.length === 0) {
        likesCount.textContent = '0';
      } else {
        // si no esta vacio, le ponemos el conteo de likes
        likesCount.textContent = likesArray.length;
      }
      likeContainer.append(likeButton, likesCount);
      likeButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (likesArray.includes(userID)) {
          // si el usuario ya dio like, quitamos el icono font awsome
          likeButton.classList.add('unliked');
          // quitamos icono lleno
          likeButton.classList.remove('fa-solid');
          likeButton.classList.remove('fa-heart');
          // Agregamos el vacio
          likeButton.classList.add('fa-regular');
          likeButton.classList.add('fa-heart');
          console.log(likeButton);
          // likeButton.style.color = '#CDDC39';
          await updateDoc(doc.ref, {
            Likes: arrayRemove(userID),
          });
          likesCount.textContent = likesArray.length; // se actualiza el textcontent
        } else {
          likeButton.classList.add('liked');
          // Agregamos el like del corazon lleno
          likeButton.classList.remove('fa-regular');
          likeButton.classList.remove('fa-heart');
          likeButton.classList.add('fa-solid');
          likeButton.classList.add('fa-heart');
          // likeButton.style.color = '#00BCD4';
          console.log(likeButton);
          await updateDoc(doc.ref, { Likes: arrayUnion(userID) });
          likesCount.textContent = likesArray.length; // se actualiza textcontent
          // Aquí implementar la lógica para incrementar un contador de likes
        }
        return likeButton;
      });
      // TERMINA PRUEBA MARI
      // likeButton.classList.add('likeButton');
      // // likeButton.style.color = '#cddc39';
      // likeButton.style.fontSize = '25px';
      // // likeButton.classList.add('unliked');
      // // Agregamos atributo testId para testear
      // likeButton.setAttribute('data-testid', 'likeButton');
      // const likesText = document.createElement('span');
      // const likesCount = document.createElement('span');
      // likesText.textContent = ' Likes';
      // // puse ?, para que sino trae la propiedad Likes no quiebre el codigo
      // const likesArray = doc.data()?.Likes;
      // const likeContainer = document.createElement('section');
      // // Si el array de likes es undefined, osea no existe o esta vacio le ponemos 0 likes
      // if (likesArray === undefined || likesArray.length === 0) {
      //   likesCount.textContent = '0';
      // } else {
      // // si no esta vacio, le ponemos el conteo de likes
      //   likesCount.textContent = likesArray.length;
      // }

      // likeContainer.append(likeButton, likesCount);

      // likeButton.addEventListener('click', async (e) => {
      //   e.preventDefault();
      //   if (likesArray.includes(userID)) {
      //     // si el usuario ya dio like
      //     likeButton.classList.add('unliked');
      //     console.log(likeButton);
      //     // likeButton.style.color = '#cddc39';
      //     await updateDoc(doc.ref, {
      //       Likes: arrayRemove(userID),
      //     });
      //     likesCount.textContent = likesArray.length; // se actualiza el textcontent
      //   } else {
      //     likeButton.classList.add('liked');
      //     // likeButton.style.color = '#00bcd4';
      //     console.log(likeButton);
      //     await updateDoc(doc.ref, { Likes: arrayUnion(userID) });
      //     likesCount.textContent = likesArray.length; // se actualiza textcontent
      //     // Aquí implementar la lógica para incrementar un contador de likes
      //   }
      //   return likeButton;
      // });

      likeContainer.classList.add('likeContainer');
      // likeContainer.append(likeButton, likesCount);

      // empieza editar y borrar posts
      // const currentUserName = user.displayName;
      if (doc.data().UserName === currentUserName) {
        // si el post pertenece al usuario loggeado
        const selectPost = document.createElement('select'); // desplegable
        // agregue un plaheholder para poder testear
        selectPost.setAttribute('placeholder', 'Options Post');
        const editOption = document.createElement('option'); // opción de editar
        const deleteOption = document.createElement('option'); // opción de borrar
        const placeholderOption = document.createElement('option'); // placeholder
        placeholderOption.textContent = '...';
        editOption.textContent = 'Edit post';
        deleteOption.textContent = 'Delete post';

        selectPost.append(placeholderOption, editOption, deleteOption); // opciones al select
        onePost.append(selectPost); // se añade desplegable a cada post

        selectPost.addEventListener('change', () => {
          // listener para el desplegable
          if (selectPost.selectedIndex === 1) {
            // cuando se elige editar
            const editSection = document.createElement('section');
            editSection.className = 'editSection';
            const textarea = document.createElement('textarea'); // crea textarea en el post
            const saveButton = document.createElement('button'); // botón de guardar
            textarea.textContent = doc.data().Content; // se coloca contenido del post en textarea
            saveButton.textContent = 'Save changes';
            editSection.append(textarea, saveButton);
            onePost.append(editSection); // se añaden botón y textarea al post en cuestión

            saveButton.addEventListener('click', async () => {
              // listener botón de guardar para acualizar el registro firebase
              await updateDoc(doc.ref, { Content: textarea.value }); // se actualiza el contenido
              onePost.removeChild(editSection); // se elimina textarea y botón del post
              selectPost.selectedIndex = 0; // se regresa el desplegable a la opción '...'
            });
          } else if (selectPost.selectedIndex === 2) {
            // cuando se elige borrar
            const dialog = document.createElement('dialog'); // se crea diálogo
            dialog.classList.add('dialog-modal');
            dialog.setAttribute('data-testid', 'dialog');
            const p = document.createElement('p'); // texto del diálogo
            p.textContent = 'Are you sure you want to delete this post?';
            const deleteButton = document.createElement('button'); // botón de borrar
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Yes';
            const cancelButton = document.createElement('button'); // botón cancelar
            cancelButton.classList.add('cancel-button');
            cancelButton.textContent = 'Cancel';

            const containerButtons = document.createElement('div');
            containerButtons.classList.add('container-buttons');
            containerButtons.append(deleteButton, cancelButton);

            dialog.append(p, containerButtons);
            postsContainer.appendChild(dialog);
            dialog.showModal(); // se muestra el modal (diálogo)

            deleteButton.addEventListener('click', async (e) => {
              // botón de borrar
              e.preventDefault();
              await deleteDoc(doc.ref); // se borra el documento de la colección
              onePost.remove(); // se borra post de la view
              dialog.close(); // se cierra el diálogo
              selectPost.selectedIndex = 0; // se regresa el desplegable a la opción '...'
            });

            cancelButton.addEventListener('click', (e) => {
              // botón de cancelar
              e.preventDefault();
              dialog.close(); // sólo se cierra el diálogo
              selectPost.selectedIndex = 0; // se regresa el desplegable a la opción '...'
            });
          }
        });
      }
      // termina editar y borrar posts

      const postLikeContainer = document.createElement('section');
      onePost.append(userName, typePost, datePost, postContent); // se añaden elementos a post ind
      postLikeContainer.append(onePost, likeContainer);
      postsContainer.append(postLikeContainer); // se añaden posts individuales a section
    }); // Termina for each

    sectionPosts.appendChild(postsContainer); // se añade contenedor de posts
    footer.appendChild(navigationBar(navigateTo)); // agrega navigatiob bar como hijo al footer
    divTitle.append(header, sectionPosts, footer); // se añade contenedor padre a body
  });
  return divTitle;
}

export default feed;
