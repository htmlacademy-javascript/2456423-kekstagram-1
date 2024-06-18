import {getRandomInteger, getRandomUniqInteger} from './util.js';

const FOTO_DESCRIPTIONS_NUMBER = 25;
const LIKES_NUMBER_MIN = 15;
const LIKES_NUMBER_MAX = 200;
const AVATARS_NUMBER = 6;
const COMMENTS_NUMBER_MIN = 1;
const COMMENTS_NUMBER_MAX = 10;

const descriptions = [
  'Моя Лучшая фотография!',
  'Фото из отпуска.',
  'Сделано объективом и любовью',
  'Я не доверяю словам. Я доверяю фотографиям',
  'Вы должны это видеть',
  'Очень выразительное фото',
  'Море впечатлений...!'
];

const commentsMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Андрей',
  'Мария',
  'Юлия',
  'Макс',
  'Сергей',
  'Вероника',
  'Антон'
];

const getRandomUniqId = getRandomUniqInteger();
const getRandomUniqUrl = getRandomUniqInteger();

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomInteger(1, AVATARS_NUMBER)}.svg`,
  message: Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(commentsMessages)).join(' '),
  name: getRandomArrayElement(names)
});

const createFotoDescription = () => ({
  id: getRandomUniqId(1, FOTO_DESCRIPTIONS_NUMBER),
  url: `photos/${getRandomUniqUrl(1, FOTO_DESCRIPTIONS_NUMBER)}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomInteger(LIKES_NUMBER_MIN, LIKES_NUMBER_MAX),
  comments: Array.from({ length: getRandomInteger(COMMENTS_NUMBER_MIN, COMMENTS_NUMBER_MAX) }, (_, index) => createComment(index))
});

const createDescription = () => Array.from({length: FOTO_DESCRIPTIONS_NUMBER}, () => createFotoDescription());
export {createDescription};
