import { debounce } from './utils.js';
import { renderGallery, getPictures } from './pictures.js';

const DEBOUNCE_DELAY = 500;
const RANDOM_IMAGE_NUMBER = 10;

const FiltersCondition = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const imgFilters = document.querySelector('.img-filters');

const debounceRenderGallery = debounce(renderGallery, DEBOUNCE_DELAY);

const getRandomPictures = (pictures) => pictures.toSorted(() => Math.random() - 0.5).slice(0, RANDOM_IMAGE_NUMBER);

const getDiscussedPictures = (pictures) => pictures.toSorted((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length);

const getSortedPictures = (filterId) => {
  const pictures = getPictures();

  switch (filterId) {
    case FiltersCondition.RANDOM:
      return getRandomPictures(pictures);
    case FiltersCondition.DISCUSSED:
      return getDiscussedPictures(pictures);
    default:
      return pictures;
  }
};

const onImgFiltersClick = (evt) => {
  const filterId = evt.target.id;

  if (filterId) {
    imgFilters.querySelector('.img-filters__button--active')?.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');

    debounceRenderGallery(getSortedPictures(filterId));
  }
};

const initFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', onImgFiltersClick);
};

export { initFilters };
