import './style.css';
import comments from './comments';

const main = document.getElementById('main');
let movies;
(async () => {
  await fetch('https://api.tvmaze.com/shows')
    .then((response) => response.json())
    .then((data) => {
      movies = data;
      main.innerHTML = movies
        .map(
          (movie) => `
        <article>
        <img src="${movie.image.medium}">
        <h1 class="movie-title">${movie.name}</h1>
        <i class="like-icon">like</i>
        <button class="comments-btn">comments</button>
        </article>
      `
        )
        .join('');
      document.querySelectorAll('.comments').forEach((btn) => {
        btn.addEventListener('click', () => {
          comments();
        });
      });
    });
})();
