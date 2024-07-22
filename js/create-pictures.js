import{openPictureModal} from './create-fullscreen-picture.js';

const createPictures = function(descriptions) {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const pictureListFragment = document.createDocumentFragment();


  descriptions.forEach((description) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = description.url;
    picture.querySelector('.picture__comments').textContent = description.comments.length;
    picture.querySelector('.picture__likes').textContent = description.likes;
    picture.dataset.pictureId = description.id;
    picture.addEventListener('click', () => {
      openPictureModal(description);
    });

    pictureListFragment.append(picture);

    picturesContainer.append(pictureListFragment);
  });
};

export{createPictures};
