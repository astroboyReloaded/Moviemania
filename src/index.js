/* eslint-disable no-use-before-define */
// Import CSS file
import './style.css';
// Get reference to main list element
const main = document.getElementById('main');
// Async function to get likes for a show
const getLikes = async () => {
  await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SzueLQl3FaQn1wJjDbsx/likes',
  )
    .then((response) => response.json())
    .then((data) => renderLikes(data));
};
const renderLikes = (likes) => {
  const likesContainers = document.querySelectorAll('.likesContainer');
  likesContainers.forEach((container) => {
    // eslint-disable-next-line array-callback-return
    likes.filter((like) => {
      if (Number(container.id) === like.item_id) {
        container.innerText = like.likes;
      }
    });
  });
};
// Async function to send like count for a show
const sendLike = async (id) => {
  await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SzueLQl3FaQn1wJjDbsx/likes',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: id }),
    },
  );
  getLikes();
};
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
