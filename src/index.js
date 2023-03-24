/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
// Import CSS file
import './style.css';

// Import item count function
import countItems from '../modules/itemCount.js';

// Import likes function
import { getLikes, sendLike } from '../modules/likes.js';

// Import popup function
import popup from '../modules/poup.js';
// Get reference to main list element
const main = document.getElementById('main');

// Fetch data from TVMaze API
(async () => {
  await fetch('https://api.tvmaze.com/shows?page=0')
    .then((response) => response.json())
    .then((data) => {
      // Get the first 10 shows
      const shows = data.slice(0, 12);
      // Loop through all shows
      shows.forEach((show) => {
        // Create elements for the show
        const li = document.createElement('li');
        const img = document.createElement('img');
        const name = document.createElement('strong');
        const commentBtn = document.createElement('button');
        commentBtn.addEventListener('click', () => popup(show));
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
        listCount.innerHTML = `(${countItems()})`;
        // Set text and classes for like button and count
        likeBtn.className = 'material-symbols-outlined';
        likeBtn.innerText = 'favorite';
        likeCount.classList.add('likesContainer');
        likeCount.id = show.id;
        // Add event listener for like button click
        likeBtn.addEventListener('click', () => {
          sendLike(show.id);
        });
        // Append elements to list item and list item to main list
        li.append(img, name, footer);
        footer.append(likeBtn, likeCount, commentBtn);
        main.appendChild(li);
      });
      getLikes();
    });
})();
