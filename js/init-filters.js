import { debounce } from './util.js';
import { renderPictures } from './render-pictures.js';

const DEBOUNCE_DELAY = 500;
const RANDOM_IMAGE_NUMBER = 10;

let pictures;
let picturesTempStorage = [];

const filtersCondition = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const imgFilters = document.querySelector('.img-filters');

const presetFilters = (filterId) => {
  imgFilters.querySelectorAll('.img-filters__button').forEach((imgFilter) => {
    if (imgFilter.getAttribute('id') === filterId) {
      imgFilter.classList.add('img-filters__button--active');
    } else if (imgFilter.classList.contains('img-filters__button--active')) {
      imgFilter.classList.remove('img-filters__button--active');
    }
  });

  picturesTempStorage.splice(0, picturesTempStorage.length);
};

const debounceRenderPictures = debounce(renderPictures, DEBOUNCE_DELAY);

const getRandomPictures = () => pictures.toSorted(() => Math.random() - 0.5).slice(0, RANDOM_IMAGE_NUMBER);

const getDiscussedPictures = () => pictures.toSorted((descriptionA, descriptionB) => descriptionB.likes - descriptionA.likes);

const onImgFiltersClick = (evt) => {
  const filterId = evt.target.getAttribute('id');
  if(filterId) {
    presetFilters(filterId);

    switch (filterId) {
      case filtersCondition.RANDOM:
        picturesTempStorage = getRandomPictures();
        break;
      case filtersCondition.DISCUSSED:
        picturesTempStorage = getDiscussedPictures();
        break;
      default:
        picturesTempStorage = pictures.slice(0, pictures.length);
    }

    debounceRenderPictures(picturesTempStorage);
  }
};

const initFilters = (gallary) => {
  pictures = gallary;

  imgFilters.classList.remove('img-filters--inactive');

  imgFilters.addEventListener('click', onImgFiltersClick);
};

export { initFilters };
