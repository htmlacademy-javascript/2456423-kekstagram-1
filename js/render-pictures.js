import{ openPictureModal } from './open-picture-modal.js';

let pictures;

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPicture = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.dataset.pictureId = picture.id;
  return pictureElement;
};

const onClickPicturesContainer = ({target}) => {
  if(target.classList.contains('picture__img')){
    const pictureId = target.closest('.picture').getAttribute('data-picture-id');
    const galleryRenderElement = pictures.find((element) => element.id === Number(pictureId));
    openPictureModal(galleryRenderElement);
  }
};

const removePictures = () => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
    picturesContainer.removeEventListener('click', onClickPicturesContainer);
  });
};

const renderPictures = (gallary) => {
  pictures = gallary;

  removePictures();

  const pictureListFragment = document.createDocumentFragment();

  gallary.forEach((picture) => {
    pictureListFragment.append(renderPicture(picture));
  });

  picturesContainer.append(pictureListFragment);

  picturesContainer.addEventListener('click', onClickPicturesContainer);

};

export{renderPictures};
