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

const onGalleryClick = ({target}) => {
  const pictureId = target.closest('.picture')?.dataset.pictureId;

  if(!pictureId) {
    return;
  }

  const pictureData = pictures.find((element) => element.id === Number(pictureId));

  if (pictureData) {
    openPictureModal(pictureData);
  }
};

const removePictures = () => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};

const renderGallery = (gallery) => {
  removePictures();

  const fragment = document.createDocumentFragment();

  gallery.forEach((picture) => {
    fragment.append(createPicture(picture));
  });

  picturesContainer.append(fragment);
};

const getPictures = () => pictures;

const initGallery = (gallery) => {
  pictures = gallery;
  picturesContainer.addEventListener('click', onGalleryClick);
  renderGallery(pictures);
};

export { renderGallery, initGallery, getPictures };
