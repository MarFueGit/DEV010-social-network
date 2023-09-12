function navigationBar(navigateTo) {
  const barContainer = document.createElement('section');
  barContainer.className = 'buttons-container';
  const feedButton = document.createElement('button');
  feedButton.textContent = 'Feed';
  feedButton.id = 'feedbutton';
  feedButton.className = 'navigation-buttons';
  const recipesButton = document.createElement('button');
  recipesButton.textContent = 'Recipes';
  recipesButton.className = 'navigation-buttons';
  recipesButton.id = 'recipesbutton';
  const workoutButton = document.createElement('button');
  workoutButton.textContent = 'Workout';
  workoutButton.className = 'navigation-buttons';
  workoutButton.id = 'workoutbutton';
  const profileButton = document.createElement('button');
  profileButton.textContent = 'Profile';
  profileButton.className = 'navigation-buttons';
  profileButton.id = 'profilebutton';

  feedButton.addEventListener('click', async (e) => {
    e.preventDefault();
    navigateTo('/feed');
  });

  recipesButton.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/recipes');
  });

  workoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/workout');
  });

  profileButton.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/profile');
  });

  if (window.location.pathname === '/feed') {
    feedButton.style.color = '#00bcd4';
    feedButton.style.fontSize = '1rem';
    feedButton.innerHTML = '<b>Feed</b>';
    recipesButton.style.color = 'black';
    // recipesButton.style.fontSize = '1rem';
    // recipesButton.style.fontWeight = 'bold';
    workoutButton.style.color = 'black';
    // workoutButton.style.fontWeight = 'bold';
    // workoutButton.style.fontSize = '1rem';
    profileButton.style.color = 'black';
    // profileButton.style.fontWeight = 'bold';
    // profileButton.style.fontSize = '1rem';
  } else if (window.location.pathname === '/recipes') {
    feedButton.style.color = 'black';
    // feedButton.style.fontSize = '1rem';
    recipesButton.style.color = '#00bcd4';
    recipesButton.style.fontSize = '1rem';
    recipesButton.innerHTML = '<b>Recipes</b>';
    workoutButton.style.color = 'black';
    // workoutButton.style.fontSize = '1rem';
    profileButton.style.color = 'black';
  } else if (window.location.pathname === '/workout') {
    feedButton.style.color = 'black';
    recipesButton.style.color = 'black';
    workoutButton.style.color = '#00bcd4';
    workoutButton.style.fontSize = '1rem';
    workoutButton.innerHTML = '<b>Workout</b>';
    // workoutButton.style.fontSize = '1rem';
    profileButton.style.color = 'black';
  } else if (window.location.pathname === '/profile') {
    feedButton.style.color = 'black';
    recipesButton.style.color = 'black';
    workoutButton.style.color = 'black';
    profileButton.style.color = '#00bcd4';
    profileButton.style.fontSize = '1rem';
    profileButton.innerHTML = '<b>Profile</b>';
  }

  barContainer.append(feedButton, recipesButton, workoutButton, profileButton);
  return barContainer;
}

export default navigationBar;
