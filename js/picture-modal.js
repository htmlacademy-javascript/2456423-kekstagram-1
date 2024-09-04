import { isEscapeKey } from './utils.js';

const COMMENTS_NUMBER = 5;
const DEFAULT_COMMENTS = 0;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const bigPictureCommentsElement = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social__comment').content;
const bigPictureCommentsLoader = bigPicture.querySelector('.social__comments-loader');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');

let renderedCommentsCount = 0;
let photoComments;

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

const renderComments = () => {
  const visibleComments = photoComments.comments.slice(renderedCommentsCount, renderedCommentsCount + COMMENTS_NUMBER);
  const comments = createComments(visibleComments);
  bigPictureCommentsElement.append(comments);
  renderedCommentsCount = Math.min(renderedCommentsCount + COMMENTS_NUMBER, photoComments.comments.length);

  if (renderedCommentsCount === photoComments.comments.length) {
    bigPictureCommentsLoader.classList.add('hidden');
  }

  socialCommentsCount.innerHTML = `${renderedCommentsCount} из  <span class="comments-count">${photoComments.comments.length}</span>`;
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const onDocumentKeydown = (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt.key)) {
    closeModal();
  }
};

function closeModal() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCommentsLoader.removeEventListener('click', onCommentsLoaderClick) ;
  renderedCommentsCount = DEFAULT_COMMENTS;
  bigPictureCommentsElement.innerHTML = '';
}

const onCloseButtonClick = () => {
  closeModal();
};

const openPictureModal = (data) => {
  photoComments = data;
  bigPicture.querySelector('img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.comments-count').textContent = data.comments.length;
  bigPicture.querySelector('.social__caption').textContent = data.description;

  if (bigPictureCommentsLoader.classList.contains('hidden')) {
    bigPictureCommentsLoader.classList.remove('hidden');
  }

  renderComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  bigPictureCancel.addEventListener('click', onCloseButtonClick);
  bigPictureCommentsLoader.addEventListener('click', onCommentsLoaderClick) ;
};

export {openPictureModal};
