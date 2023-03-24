import { getComments, submitComment } from './comments.js';

const closePopup = (body, popup) => {
  body.removeChild(popup);
  document.body.style.overflowY = 'auto';
};

const setEvents = (body, popup, id) => {
  document
    .getElementById('closePopup')
    .addEventListener('click', () => closePopup(body, popup));

  getComments(id);

  const userName = document.getElementById('userName');
  const Comment = document.getElementById('Comment');

  document.getElementById('submitComment').addEventListener('click', (e) => {
    e.preventDefault();
    submitComment(id, userName, Comment);
  });
};

export default setEvents;
