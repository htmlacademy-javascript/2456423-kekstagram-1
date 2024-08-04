import { isKeyEscape } from './util.js';
import { createEffect } from './create-effect.js';

const HASH_TAGS_ERROR = 'Ошибка ввода хеш-тега';
const HASH_TAGS_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const hasValidCount = (tags) => tags.length <= HASH_TAGS_COUNT && tags.every((tag) => tag.length <= 20);

const hasUniqTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return tags.length === new Set(lowerCaseTags).size;
};

const hasValidTags = (tags) => tags.every((tag) => VALID_SYMBOLS.test(tag));

const hashTagsValidator = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqTags(tags) && hasValidTags(tags);
};

pristine.addValidator(
  hashtagField,
  hashTagsValidator,
  HASH_TAGS_ERROR
);

const isTextfieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

const onKeyEscapeKeydown = (evt) => {
  if (isKeyEscape(evt) && !isTextfieldFocused()) {
    evt.preventDefault();
    closeFormModal();
  }
};

function closeFormModal() {
  form.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyEscapeKeydown);
}

const openFormModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onKeyEscapeKeydown);
  imgUploadCancel.addEventListener('click', closeFormModal);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

const createFormModal = () => {
  uploadFile.addEventListener('change', openFormModal);
  createEffect();
};

export {createFormModal};

