import { isEscapeKey } from './utils.js';

const ALERT_SHOW_TIME = 5000;
const CLOSE_ELEMENTS_ATTRIBUTE = 'data-dialog-close';

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

const onActiveDialogClick = (evt) => {
  if (evt.target.hasAttribute(CLOSE_ELEMENTS_ATTRIBUTE)) {
    closeDialog();
  }
};

const showDialog = (dialogTemplate) => {
  activeDialog = dialogTemplate.cloneNode(true);
  document.body.append(activeDialog);
  activeDialog.addEventListener('click', onActiveDialogClick);
  document.addEventListener('keydown', onDocumentKeydown, true);
};

const showAlert = (message) => {
  const alertContainer = alert.cloneNode(true);

  alertContainer.querySelector('.alert__message').innerHTML = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { showDialog, showAlert };
