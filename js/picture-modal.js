import { isEscapeKey } from './utils.js';

const COMMENTS_NUMBER = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const bigPictureCommentsElement = bigPicture.querySelector('.social__comments');
const bigPictureCommentsLoader = bigPicture.querySelector('.social__comments-loader');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');

let commentTemplate;

let renderedCommentsCount = 0;
let rawDescription;

const createComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.map((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    fragment.append(commentElement);
  });

  return fragment;
};

const onKeyEscapeKeydown = (evt) => {
  evt.preventDefault();
  if(isEscapeKey(evt)) {
    handleCloseButtonClick();
  }
};

const renderComments = () => {
  bigPictureCommentsElement.append(createComments(rawDescription.comments.slice(renderedCommentsCount, renderedCommentsCount + COMMENTS_NUMBER)));
  renderedCommentsCount = Math.min(renderedCommentsCount + COMMENTS_NUMBER, rawDescription.comments.length);
  bigPictureCommentsLoader.disabled = renderedCommentsCount === rawDescription.comments.length;
  socialCommentsCount.innerHTML = `${renderedCommentsCount} из  <span class="comments-count">${rawDescription.comments.length}</span>`;
};

const handleCommentsLoaderClick = () => {
  renderComments();
};

function handleCloseButtonClick() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyEscapeKeydown);
  bigPictureCommentsLoader.removeEventListener('click', handleCommentsLoaderClick) ;
  renderedCommentsCount = 0;
}

const openPictureModal = (description) => {
  rawDescription = description;
  bigPicture.querySelector('img').src = description.url;
  bigPicture.querySelector('.likes-count').textContent = description.likes;
  bigPicture.querySelector('.comments-count').textContent = description.comments.length;
  bigPicture.querySelector('.social__caption').textContent = description.description;

  commentTemplate = document.querySelector('.social__comment');
  bigPictureCommentsElement.innerHTML = ' ';
  renderComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onKeyEscapeKeydown);

  bigPictureCancel.addEventListener('click', handleCloseButtonClick);
  bigPictureCommentsLoader.addEventListener('click', handleCommentsLoaderClick) ;
};

export {openPictureModal};
