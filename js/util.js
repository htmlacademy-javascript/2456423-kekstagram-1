const MIN_INDEX = 0;
const MAX_INDEX = 24;

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqInteger = () => {
  let currentIndexValue = 0;
  const previousInexValue = [];
  return () => {
    while (previousInexValue.includes(currentIndexValue)) {
      currentIndexValue = getRandomInteger(MIN_INDEX, MAX_INDEX);
    }
    previousInexValue.push(currentIndexValue);
    if (previousInexValue.length === 10) {
      previousInexValue.splice(0, previousInexValue.length);
    }
    return currentIndexValue;
  };
};

const getUniqIndex = getUniqInteger();

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, getUniqIndex, debounce};
