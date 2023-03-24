const getComments = async (id) => {
  const commentsContainer = document.getElementById('commentsSection');

  await fetch(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SzueLQl3FaQn1wJjDbsx/comments?item_id=${id}`
  )
    .then((response) => response.json())
    .then((data) => {
      const comments = data;
      document.body.style.overflowY = 'hidden';
      commentsContainer.innerHTML = `<h2>Comments(${comments.length})</h2>
        <ul class="coments-ul">
          ${comments
            .map(
              (each) => `<li class="comment-li">
                <time>${each.creation_date}</time>
                ${each.username}: ${each.comment}
                </li>`
            )
            .join('')}
        </ul>`;
    })
    .catch(() => {
      commentsContainer.innerHTML = `
    <p>Be the firs to comment!</p>
    `;
    });
};

const submitComment = async (id, userName, Comment) => {
  await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SzueLQl3FaQn1wJjDbsx/comments',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_id: id,
        username: userName.value,
        comment: Comment.value,
      }),
    }
  );
  Comment.value = '';
  Comment.focus();
  getComments(id);
};

export { getComments, submitComment };
