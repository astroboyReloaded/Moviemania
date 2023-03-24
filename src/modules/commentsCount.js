const commentsCount = (comments) => {
  const count = typeof comments.length === 'number' && comments.length;
  return count;
};

export default commentsCount;
