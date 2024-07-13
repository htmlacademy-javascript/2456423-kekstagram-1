import {isKeyEscape} from './util.js';

const createFullScreenPicture = (descriptions) => {
  const pictures = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureCancel = document.querySelector('.big-picture__cancel');

  const createComments = (index) => {
    const commentsListFragment = document.createDocumentFragment();
    const commentsArray = descriptions[index].comments;

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
      closeFullScreenImage();
    }
  };

  const openFullScreenImage = (picture) => {
    const id = +picture.dataset.pictureId;

    const isArrayElementIdEquel = (element) => +element.id === id; /*Вынести в util.js*/
    const picturePrototypeArrayNumber = descriptions.findIndex(isArrayElementIdEquel);

    bigPicture.querySelector('img').src = descriptions[picturePrototypeArrayNumber].url;
    bigPicture.querySelector('.likes-count').textContent = descriptions[picturePrototypeArrayNumber].likes;
    bigPicture.querySelector('.comments-count').textContent = descriptions[picturePrototypeArrayNumber].comments.length;
    bigPicture.querySelector('.social__caption').textContent = descriptions[picturePrototypeArrayNumber].description;
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');

    const comments = bigPicture.querySelector('.social__comments');
    const commentsInner = createComments(picturePrototypeArrayNumber);
    comments.innerHTML = ' ';
    comments.append(commentsInner);


    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onKeyEscapeKeydown);
  };

  const closeFullScreenImage = () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onKeyEscapeKeydown);
  };

  pictures.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if(picture) {
      openFullScreenImage(picture);
    }
  });


  bigPictureCancel.addEventListener('click', () => {
    closeFullScreenImage();
  });
};

export {createFullScreenPicture};
