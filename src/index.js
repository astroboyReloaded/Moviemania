/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
// Import CSS file
import './style.css';

// Get reference to main list element
const main = document.getElementById('main');

// Async function to get likes for a show
async function getLikes() {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8ae878c40e24371ea51406311a0a2161/likes');
  const data = await response.json();
  return data[0]?.likes || 0;
}

// Async function to send like count for a show
async function sendLike(showId) {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8ae878c40e24371ea51406311a0a2161/likes/${showId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      item_id: showId,
    }),
  });
  return response.text();
}

// Fetch data from TVMaze API
fetch('https://api.tvmaze.com/shows?page=0')
  .then((response) => response.json())
  .then(async (data) => {
    // Get the first 10 shows
    const shows = data.slice(0, 10);

    // Get likes for all shows in parallel
    const showLikes = await Promise.all(shows.map((show) => getLikes(show.id)));

    // Loop through all shows
    shows.forEach((show, i) => {
      // Create elements for the show
      const li = document.createElement('li');
      const img = document.createElement('img');
      const name = document.createElement('strong');
      const commentBtn = document.createElement('button');
      const likeBtn = document.createElement('span');
      const likeCount = document.createElement('span');
      const footer = document.createElement('div');
      const listCount = document.getElementById('list-count');

      // Set classes for elements
      li.className = 'main__list';
      footer.className = 'main__list__btn';

      // Set image source and name text
      img.src = show.image.medium;
      name.innerText = show.name;
      commentBtn.innerText = 'Comment';

      // Set text and classes for like button and count
      likeBtn.className = 'material-symbols-outlined';
      likeBtn.innerText = 'favorite';
      show.likes = showLikes[i];
      likeCount.innerHTML = `${show.likes} likes`;
      listCount.innerHTML = `(${countItems()})`;

      // Add event listener for like button click
      likeBtn.addEventListener('click', async () => {
        show.likes++;
        likeCount.innerHTML = `${show.likes} likes`;
        const response = await sendLike(show.id, show.likes);
        return response;
      });

      // Append elements to list item and list item to main list
      li.append(img, name, footer);
      footer.append(likeBtn, likeCount, commentBtn);
      main.appendChild(li);
    });
  });

function countItems() {
  const listItems = document.querySelectorAll('.main__list');
  let count = 1;
  listItems.forEach((item) => {
    if (item.style.display !== 'none') {
      count++;
    }
  });
  return count;
}