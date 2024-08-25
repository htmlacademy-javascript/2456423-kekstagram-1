import { createPictures } from './create-pictures.js';

import { getUniqIndex, debounce } from './util.js';

const DEBOUNCE_DELAY = 500;
const RANDOM_IMAGE_NUMBER = 10;

let descriptionsTempStorage = [];

const filtersCondition = {
  DAFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const imgFilters = document.querySelector('.img-filters');
const picturesContainer = document.querySelector('.pictures');

const initFilters = (filterId) => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });

  imgFilters.querySelectorAll('.img-filters__button').forEach((imgFilter) => {
    if (imgFilter.getAttribute('id') === filterId) {
      imgFilter.classList.add('img-filters__button--active');
    } else if (imgFilter.classList.contains('img-filters__button--active')) {
      imgFilter.classList.remove('img-filters__button--active');
    }
  });

  descriptionsTempStorage.splice(0, descriptionsTempStorage.length);
};

const debounceCreatePictures = debounce(createPictures, DEBOUNCE_DELAY);

const filters = (descriptions) => {
  imgFilters.classList.remove('img-filters--inactive');
  createPictures(descriptions);
  imgFilters.addEventListener('click', (evt) => {
    const filterId = evt.target.getAttribute('id');
    initFilters(filterId);
    switch (filterId) {
      case filtersCondition.DAFAULT:
        debounceCreatePictures(descriptions);
        break;
      case filtersCondition.RANDOM:
        for (let i = 0; i < RANDOM_IMAGE_NUMBER; i++) {
          descriptionsTempStorage.push(descriptions.slice()[getUniqIndex()]);
        }
        debounceCreatePictures(descriptionsTempStorage);
        break;
      case filtersCondition.DISCUSSED:
        descriptionsTempStorage = descriptions.slice().sort((descriptionA, descriptionB) => descriptionB.likes - descriptionA.likes);
        debounceCreatePictures(descriptionsTempStorage);
        break;
      default: break;
    }
  });
};

export { filters };
