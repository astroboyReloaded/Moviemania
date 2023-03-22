import './style.css';

const main = document.getElementById('main');
// Fetch data from TVMaze API
fetch('https://api.tvmaze.com/shows?page=0')
  .then((response) => response.json())
  .then((data) => {
    // Display first 9 shows
    data.slice(0, 12).forEach((show) => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      const name = document.createElement('strong');
      const commentBtn = document.createElement('button');
      const likeBtn = document.createElement('span');
      const footer = document.createElement('div');

      li.className = 'main__list';
      footer.className = 'main__list__btn';

      img.src = show.image.medium;
      name.innerText = show.name;
      commentBtn.innerText = 'Comment';
      likeBtn.className = 'material-symbols-outlined';
      likeBtn.innerText = 'favorite';

      li.appendChild(img);
      li.appendChild(name);
      footer.appendChild(likeBtn);
      footer.appendChild(commentBtn);
      li.appendChild(footer);

      main.appendChild(li);
    });
  });
