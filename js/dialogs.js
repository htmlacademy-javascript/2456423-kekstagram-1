import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;

const alert = document.querySelector('#alert');

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
  document.removeEventListener('keydown', onDocumentKeydown, { capture: true });
}

const showDialog = (dialogTemplate) => {
  activeDialog = dialogTemplate.content.querySelector('section').cloneNode(true);
  document.body.append(activeDialog);
  activeDialog.addEventListener('click', () => closeDialog());
  activeDialog.querySelector('[data-close-button]').addEventListener('click', () => closeDialog());
  document.addEventListener('keydown', onDocumentKeydown, { capture: true });
};

const showAlert = (message) => {
  const alertContainer = alert.content.querySelector('.alert').cloneNode(true);

  document.body.append(alertContainer);
  alertContainer.querySelector('.allert__message').innerHTML = message;

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { showDialog, showAlert };
