import { debounce } from './util.js';
import { renderGallary, getPictures } from './pictures.js';

const DEBOUNCE_DELAY = 500;
const RANDOM_IMAGE_NUMBER = 10;

const filtersCondition = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const imgFilters = document.querySelector('.img-filters');

const debounceRenderGallary = debounce(renderGallary, DEBOUNCE_DELAY);

const getRandomPictures = (pictures) => pictures.toSorted(() => Math.random() - 0.5).slice(0, RANDOM_IMAGE_NUMBER);

const getDiscussedPictures = (pictures) => pictures.toSorted((descriptionA, descriptionB) => descriptionB.likes - descriptionA.likes);

const getSortedPictures = (filterId) => {
  const pictures = getPictures();

  switch (filterId) {
    case filtersCondition.RANDOM:
      return getRandomPictures(pictures);
    case filtersCondition.DISCUSSED:
      return getDiscussedPictures(pictures);
    default:
      return pictures;
  }
};

const onImgFiltersClick = (evt) => {
  const filterId = evt.target.id;

  if (filterId) {
    imgFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');

    debounceRenderGallary(getSortedPictures(filterId));
  }
};

const initFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', onImgFiltersClick);
};

export { initFilters };
