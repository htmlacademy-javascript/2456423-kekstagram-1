const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomUniqInteger = () => {
  let currentValue = 0;
  const previousValues = [];
  return (min, max) => {
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, getRandomUniqInteger, isEscapeKey};
