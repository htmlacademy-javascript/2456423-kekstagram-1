import { isEscapeKey } from './util.js';
import { onKeyEscapeKeydown } from './open-form-modal.js';

const errorUsersImages = document.querySelector('#error-users-images');

const ALERT_SHOW_TIME = 5000;

let dialogType;

const onDocumentKeydown = (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt)) {
    closeDialog();
  }
};

function closeDialog() {
  document.querySelector(`.${dialogType}`).remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onKeyEscapeKeydown);
}

const showDialog = (templateDialog) => {
  const dialog = templateDialog.content.cloneNode(true);

  const dialogFragment = document.createDocumentFragment();
  dialogFragment.append(dialog);

  dialogType = dialogFragment.querySelector('[type = "button"]').getAttribute('data-message-type');

  document.body.append(dialogFragment);
  document.querySelector(`.${dialogType}`).addEventListener('click', closeDialog);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showAlert = (message) => {
  const alertContainer = errorUsersImages.content.cloneNode(true);

  document.body.append(alertContainer);
  document.querySelector('.error-users-images').innerHTML = message;

  setTimeout(() => {
    document.querySelector('.error-users-images').remove();
  }, ALERT_SHOW_TIME);
};

export { showDialog, showAlert };
