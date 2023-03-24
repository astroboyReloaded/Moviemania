/* eslint-disable no-plusplus */
export default function countItems() {
  const listItems = document.querySelectorAll('.main__list');
  let count = 1;
  listItems.forEach((item) => {
    if (item.style.display !== 'none') {
      count++;
    }
  });
  return count;
}
