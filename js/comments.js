const commentsList = document.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');
const commentsListFragment = document.createDocumentFragment();

/**
 *
 * @param {object} comments массив коментариев
 */
const createCommentForm = (comments) => {
  comments.forEach(({avatar, name, message}) => {
    const comment = commentItem.cloneNode(true);
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').innerText = message;
    commentsList.append(comment);
  });
  commentsList.append(commentsListFragment);
};


export {createCommentForm};
