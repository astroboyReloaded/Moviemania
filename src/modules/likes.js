// Async function to get likes for a show
export const getLikes = async () => {
  await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SzueLQl3FaQn1wJjDbsx/likes',
  )
    .then((response) => response.json())
    // eslint-disable-next-line no-use-before-define
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
export const sendLike = async (id) => {
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