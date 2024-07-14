import {isKeyEscape} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const createComments = (description) => {
  const commentsListFragment = document.createDocumentFragment();
  const commentsArray = description.comments;

  commentsArray.forEach((element) => {
    const comment = document.querySelector('.social__comment').cloneNode(true);
    comment.querySelector('.social__picture').src = element.avatar;
    comment.querySelector('.social__picture').alt = element.name;
    comment.querySelector('.social__text').textContent = element.message;
    commentsListFragment.append(comment);
  });
  return commentsListFragment;
};

const onKeyEscapeKeydown = (evt) => {
  evt.preventDefault();
  if(isKeyEscape(evt)) {
    handleCloseButtonClick();
  }
};

const handleCloseButtonClick = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyEscapeKeydown);
};

const openFullScreenImage = (description) => {
  bigPicture.querySelector('img').src = description.url;
  bigPicture.querySelector('.likes-count').textContent = description.likes;
  bigPicture.querySelector('.comments-count').textContent = description.comments.length;
  bigPicture.querySelector('.social__caption').textContent = description.description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  const comments = bigPicture.querySelector('.social__comments');
  const commentsInner = createComments(description);
  comments.innerHTML = ' ';
  comments.append(commentsInner);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onKeyEscapeKeydown);

  bigPictureCancel.addEventListener('click', handleCloseButtonClick);
};

export {openFullScreenImage};
