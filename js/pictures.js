import{ openPictureModal } from './picture-modal.js';

let pictures = [];

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.dataset.pictureId = picture.id;

  return pictureElement;
};

const onGallaryClick = ({target}) => {
  const pictureId = target.closest('.picture')?.dataset.pictureId;
  const pictureData = pictures[pictureId];

  if(pictureId &&
    pictureData
  ) {
    openPictureModal(pictureData);
  }
};

const removePictures = () => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};

const renderGallary = (gallary) => {
  removePictures();

  const fragment = document.createDocumentFragment();

  gallary.forEach((picture) => {
    fragment.append(createPicture(picture));
  });
  picturesContainer.append(fragment);
  picturesContainer.addEventListener('click', onGallaryClick);
};

const getPictures = () => pictures;

const initGallary = (gallary) => {
  pictures = gallary;
  renderGallary(pictures);
};

export{renderGallary, initGallary, getPictures};
