import { isEscapeKey } from './utils.js';

const ALERT_SHOW_TIME = 5000;
const ERROR_CLASS = 'error__inner';
const SUCCESS_CLASS = 'success__inner';
const ERROR_TITLE_CLASS = 'error__title';
const SUCCESS_TITLE_CLASS = 'success__title';

const alert = document.querySelector('#alert').content.querySelector('.alert');

let activeDialog;

const onDocumentKeydown = (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt.key)) {
    evt.stopPropagation();
    closeDialog();
  }
};

function closeDialog() {
  activeDialog?.remove();
  activeDialog = null;
  document.removeEventListener('keydown', onDocumentKeydown, true);
}

const isClickablePartActiveDialog = (evt) =>
  evt.target.getAttribute('class') !== ERROR_CLASS &&
  evt.target.getAttribute('class') !== SUCCESS_CLASS &&
  evt.target.getAttribute('class') !== SUCCESS_TITLE_CLASS &&
  evt.target.getAttribute('class') !== ERROR_TITLE_CLASS;

const onActiveDialogClick = (evt) => {
  if (isClickablePartActiveDialog(evt)) {
    closeDialog();
  }
};

const showDialog = (dialogTemplate) => {
  activeDialog = dialogTemplate.cloneNode(true);
  document.body.append(activeDialog);
  activeDialog.addEventListener('click', onActiveDialogClick);
  activeDialog.querySelector('[data-close-button]')?.addEventListener('click', () => closeDialog());
  document.addEventListener('keydown', onDocumentKeydown, true);
};

const showAlert = (message) => {
  const alertContainer = alert.cloneNode(true);

  document.body.append(alertContainer);
  alertContainer.querySelector('.alert__message').innerHTML = message;

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { showDialog, showAlert };
