import { isEscapeKey } from './utils.js';
import { initImageEffect } from './image-effects.js';
import { resetEffects, resetScaleControl } from './image-effects.js';
import { showDialog } from './dialogs.js';
import { sendData } from './api.js';

const HASH_TAGS_ERROR = 'Ошибка ввода хеш-тега';
const MAX_TAGS_COUNT = 5;
const TAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_TAG_LENGTH = 20;

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const UploadButtonText = {
  DISABLED: 'Загружаем...',
  AVAILABLE: 'Опубликовать',
};

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const successDialog = document.querySelector('#success').content.querySelector('section');
const errorDialog = document.querySelector('#error').content.querySelector('section');
const preview = document.querySelector('.img-upload__preview img');
const effectsPictures = document.querySelectorAll('.effects__preview');

const defaultPreviewSrc = './img/upload-default-image.jpg';

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isTagCountValid = (tags) => tags.length <= MAX_TAGS_COUNT && tags.every((tag) => tag.length <= MAX_TAG_LENGTH);

const isTagsUniq = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return tags.length === new Set(lowerCaseTags).size;
};

const isTagsPatternValid = (tags) => tags.every((tag) => TAG_PATTERN.test(tag));

const isTagsValid = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return isTagCountValid(tags) && isTagsUniq(tags) && isTagsPatternValid(tags);
};

pristine.addValidator(
  hashtagField,
  isTagsValid,
  HASH_TAGS_ERROR
);

const isTextfieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

const resetPreview = () => {
  preview.src = defaultPreviewSrc;

  effectsPictures.forEach((picture) => {
    picture.removeAttribute('style');
  });
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt.key) && !isTextfieldFocused()) {
    evt.preventDefault();
    closeForm();
  }
};

const onImgUploadCancelClick = () => {
  closeForm();
};

function closeForm () {
  resetPreview();
  form.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const toggleSubmitButton = (disabled) => {
  uploadFile.disabled = disabled;
  imgUploadSubmit.textContent = disabled ? UploadButtonText.DISABLED : UploadButtonText.AVAILABLE;
};

async function onSubmitUserForm(evt) {
  try {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      toggleSubmitButton(true);
      await sendData(formData);
      closeForm();
      showDialog(successDialog);
    }
  } catch(err) {
    showDialog(errorDialog);
  } finally {
    toggleSubmitButton(false);
  }
}

const setPreview = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const previewSrc = URL.createObjectURL(file);

    preview.src = previewSrc;

    effectsPictures.forEach((picture) => {
      picture.style.backgroundImage = `url("${previewSrc}")`;
    });
  }
};

const onUploadFileClick = () => {
  setPreview();
  resetScaleControl();
  resetEffects();
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const initFormModal = () => {
  uploadFile.addEventListener('change', onUploadFileClick);
  imgUploadCancel.addEventListener('click', onImgUploadCancelClick);
  initImageEffect();
  form.addEventListener('submit', onSubmitUserForm);
};

export { initFormModal };
