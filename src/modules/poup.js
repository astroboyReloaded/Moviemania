import setEvents from './setEvents.js';

const body = document.getElementById('body');

const popup = (show) => {
  const movieArticle = document.createElement('article');
  movieArticle.classList.add('movieArticle');
  movieArticle.innerHTML = `
  <button id="closePopup" type="button" class="closeMovieArt">X</button>
  <img src="${show.image.original}" class="articleImg">
  <h1>${show.name}</h1>
  <p>${show.genres}${show.summary}</p>
  <section id="commentsSection"></section>
  <form class="commentsForm">
    <h2>Add a comment</h2>
    <input id="userName" type="text" placeholder="Your name">
    <textarea id="Comment" placeholder="Your insights"></textarea>
    <button id="submitComment">Comment</button>
  </form>
  `;
  body.appendChild(movieArticle);
  setEvents(body, movieArticle, show.id);
};

export default popup;
