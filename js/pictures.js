import{ openPictureModal } from './open-picture-modal.js';
import{ initFilters } from './filters.js';

let pictures = null;

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

const onPicturesContainerClick = ({target}) => {
  const pictureId = target.closest('.picture').dataset.pictureId;
  const galleryRenderElement = pictures.find((element) => element.id === Number(pictureId));

  if(pictureId && galleryRenderElement) {
    openPictureModal(galleryRenderElement);
  }
};

const removePictures = () => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};

function renderPictures(gallary) {

  removePictures();

  const fragment = document.createDocumentFragment();

  gallary.forEach((picture) => {
    fragment.append(createPicture(picture));
  });

  picturesContainer.append(fragment);

  picturesContainer.addEventListener('click', onPicturesContainerClick);

}

const getPictures = () => pictures;

const initPictures = (gallary) => {
  pictures = gallary;

  renderPictures(pictures);

  initFilters();
};

export{renderPictures, initPictures, getPictures};
