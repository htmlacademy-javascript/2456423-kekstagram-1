import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;

const alert = document.querySelector('#alert').content.querySelector('.alert');

let activeDialog;

const onDocumentKeydown = (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    closeDialog();
  }
};

function closeDialog() {
  activeDialog?.remove();
  activeDialog = null;
  document.removeEventListener('keydown', onDocumentKeydown, true);
}

const showDialog = (dialogTemplate) => {
  activeDialog = dialogTemplate.cloneNode(true);
  document.body.append(activeDialog);
  activeDialog.addEventListener('click', () => closeDialog());
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
