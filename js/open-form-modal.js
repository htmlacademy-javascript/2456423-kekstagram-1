import { isKeyEscape } from './util.js';
import { initImageEffect } from './init-image-effect.js';
import { setDefaultEffect } from './init-image-effect.js';
import { showAlertSendForm } from './show-alert.js';
import { sendData } from './api.js';

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
  form.removeEventListener('submit', onSubmitUserForm);
}

const blockSubmitButton = () => {
  uploadFile.disabled = true;
};

const unblockSubmitButton = () => {
  uploadFile.disabled = false;
};

async function onSubmitUserForm(evt) {
  try {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      blockSubmitButton();
      document.removeEventListener('keydown', onKeyEscapeKeydown);
      await sendData(formData);
      closeFormModal();
      showAlertSendForm('success');
      unblockSubmitButton();
    }
  } catch {
    showAlertSendForm('error');
    unblockSubmitButton();
  }
}

const setUserFormSubmit = () => form.addEventListener('submit', onSubmitUserForm);

const openFormModal = () => {
  setDefaultEffect();
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onKeyEscapeKeydown);
  imgUploadCancel.addEventListener('click', closeFormModal);

  setUserFormSubmit();
};

const createFormModal = () => {
  uploadFile.addEventListener('change', openFormModal);
  initImageEffect();
};

export { createFormModal, onKeyEscapeKeydown };

