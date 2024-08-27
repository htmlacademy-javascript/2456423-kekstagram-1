import { debounce } from './util.js';
import { renderPictures, getPictures } from './pictures.js';

const DEBOUNCE_DELAY = 500;
const RANDOM_IMAGE_NUMBER = 10;

const filtersCondition = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const imgFilters = document.querySelector('.img-filters');

const presetFilters = () => {
  imgFilters.querySelectorAll('.img-filters__button').forEach((imgFilter) => {
    if (imgFilter.classList.contains('img-filters__button--active')) {
      imgFilter.classList.remove('img-filters__button--active');
    }
  });
};

const debounceRenderPictures = debounce(renderPictures, DEBOUNCE_DELAY);

const getRandomPictures = () => getPictures().toSorted(() => Math.random() - 0.5).slice(0, RANDOM_IMAGE_NUMBER);

const getDiscussedPictures = () => getPictures().toSorted((descriptionA, descriptionB) => descriptionB.likes - descriptionA.likes);

const getSortedPictures = (filterId) => {
  let picturesTempStorage = [];

  switch (filterId) {
    case filtersCondition.RANDOM:
      picturesTempStorage = getRandomPictures();
      break;
    case filtersCondition.DISCUSSED:
      picturesTempStorage = getDiscussedPictures();
      break;
    default:
      picturesTempStorage = getPictures();
  }

  return picturesTempStorage;
};

const onImgFiltersClick = (evt) => {
  const filterId = evt.target.id;

  if(filterId) {
    presetFilters();

    evt.target.classList.add('img-filters__button--active');

    debounceRenderPictures(getSortedPictures(filterId));
  }
};

const initFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', onImgFiltersClick);
};

export { initFilters };
