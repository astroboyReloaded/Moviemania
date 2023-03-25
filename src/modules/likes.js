const renderLikes = (likes) => {
  const likesContainers = document.querySelectorAll('.likesContainer');
  likesContainers.forEach((container) => {
    likes.filter((like) => {
      if (Number(container.id) === like.item_id) {
        container.innerText = like.likes;
        return true;
      }
      return false;
    });
  });
};

// Async function to get likes for a show
export const getLikes = async () => {
  await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SzueLQl3FaQn1wJjDbsx/likes',
  )
    .then((response) => response.json())
    .then((data) => renderLikes(data));
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