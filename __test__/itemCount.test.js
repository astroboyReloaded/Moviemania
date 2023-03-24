import countItems from '../modules/itemCount.js';

test('Count items in the list', () => {
  document.body.innerHTML = `
    <ul id="main">
      <li class="main__list"></li>
      <li class="main__list"></li>
      <li class="main__list"></li>
      <li class="main__list"></li>
      <li class="main__list"></li>
      <li class="main__list"></li>
      <li class="main__list"></li>
    </ul>
  `;
  expect(countItems()).toBe(8);
});