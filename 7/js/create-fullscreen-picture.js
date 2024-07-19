import {isKeyEscape} from './util.js';

const COMMENTS_NUMBER = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const comments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
let commentsCount = 0;
let Description = null;

const createComments = (description) => {
  const commentsCountText = bigPicture.querySelector('.comments-count').cloneNode();
  const sotialCommentsCount = bigPicture.querySelector('.social__comment-count');
  const commentsListFragment = document.createDocumentFragment();
  const commentsArray = description.comments;
  const commentsArrayLength = commentsArray.length;
  const numberAddingComments = commentsArrayLength - commentsCount >= COMMENTS_NUMBER ? COMMENTS_NUMBER : commentsArrayLength - commentsCount;

  for(let i = 0; i < numberAddingComments; i++) {
    const comment = document.querySelector('.social__comment').cloneNode(true);
    const j = i + commentsCount;
    comment.querySelector('.social__picture').src = commentsArray[j].avatar;
    comment.querySelector('.social__picture').alt = commentsArray[j].name;
    comment.querySelector('.social__text').textContent = commentsArray[j].message;
    commentsListFragment.append(comment);
  }

  commentsCount += numberAddingComments;

  sotialCommentsCount.innerHTML = ' ';
  sotialCommentsCount.textContent = `${commentsCount} из `;
  commentsCountText.textContent = commentsArrayLength;
  sotialCommentsCount.append(commentsCountText);

  commentsLoader.disabled = commentsCount === commentsArrayLength;

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
  commentsLoader.removeEventListener('click', onCommentsLoaderClick) ;
  commentsCount = 0;
};

const onCommentsLoaderClick = () => {
  const commentsAdding = createComments(Description);
  comments.append(commentsAdding);
};

const openFullScreenImage = (description) => {
  Description = description;
  bigPicture.querySelector('img').src = description.url;
  bigPicture.querySelector('.likes-count').textContent = description.likes;
  bigPicture.querySelector('.comments-count').textContent = description.comments.length;
  bigPicture.querySelector('.social__caption').textContent = description.description;

  const commentsInner = createComments(description);
  comments.innerHTML = ' ';
  comments.append(commentsInner);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onKeyEscapeKeydown);

  bigPictureCancel.addEventListener('click', handleCloseButtonClick);

  commentsLoader.addEventListener('click', onCommentsLoaderClick) ;
};
export {openFullScreenImage};
