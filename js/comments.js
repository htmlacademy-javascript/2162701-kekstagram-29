const commentsList = document.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');
const commentsListFragment = document.createDocumentFragment();

/**
 * Функция по отрисовке коментариев
 * @param {object} comments массив коментариев
 */
const renderComments = (comments) => {
  comments.forEach(({avatar, name, message}) => {
    const comment = commentItem.cloneNode(true);
    const picture = commentItem.querySelector('.social__picture');
    picture.src = avatar;
    picture.alt = name;
    comment.querySelector('.social__text').innerText = message;
    commentsList.append(comment);
  });
  commentsList.append(commentsListFragment);
};


export {renderComments};
