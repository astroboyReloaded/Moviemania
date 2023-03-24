import commentsCount from '../modules/commentsCount.js';

const noCmmnts = {
  error: {
    message: "'item_id' not found.",
    status: 400,
  },
};

const comments = [
  {
    comment: 'My comment',
    creation_date: '2023-03-23',
    username: 'User2',
  },
  {
    comment: 'My comment2',
    creation_date: '2023-03-23',
    username: 'user1',
  },
  {
    comment: 'Comment3',
    creation_date: '2023-03-24',
    username: 'U3',
  },
];

describe('Comments Count', () => {
  test('Count = 0', () => {
    expect(commentsCount(noCmmnts)).toBeFalsy();
  });
  test('Count = 3', () => {
    expect(commentsCount(comments)).toStrictEqual(3);
  });
});
