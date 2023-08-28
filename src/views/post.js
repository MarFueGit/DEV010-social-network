export const setUpPosts = (data) => {
  const section = document.createElement('section');
  if (data.length) {
    const ul = document.createElement('ul');
    data.forEach((doc) => {
      const post = doc.data();
      console.log(post);
      const li = document.createElement('li');
      const h4 = document.createElement('h4');
      const p = document.createElement('p');

      h4.textContent = post.Type;
      p.textContent = post.Content;

      li.append(h4, p);
      ul.append(li);
    });
    console.log('loop posts');
    section.append(ul);
  } else {
    const h3 = document.createElement('h3');
    h3.textContent = 'There are not post to show';
    section.append(h3);
  }
  return section;
};
