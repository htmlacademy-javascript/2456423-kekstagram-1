import { isKeyEscape } from './util.js';
import { onKeyEscapeKeydown } from './open-form-modal.js';

const ALERT_SHOW_TIME = 5000;

const alertSuccess = document.querySelector('#success');
const alertError = document.querySelector('#error');

let closeButtonClass;
let alertFormType;

const onKeyEscapeAlertKeydown = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  if (isKeyEscape(evt)) {
    handleCloseButtonClick();
  }
};

const isCloseButtonFocused = () => document.activeElement === document.querySelector(closeButtonClass);

const onEscapeClickOnDocument = (evt) => {
  evt.preventDefault();
  if (!isCloseButtonFocused()) {
    handleCloseButtonClick();
  }
};

function handleCloseButtonClick() {
  document.querySelector(`.${alertFormType}`).remove();
  document.removeEventListener('keydown', onKeyEscapeAlertKeydown);
  document.removeEventListener('click', onEscapeClickOnDocument);
  document.addEventListener('keydown', onKeyEscapeKeydown);
}

const showAlertSendForm = (alertType) => {
  alertFormType = alertType;
  closeButtonClass = `.${alertFormType}__button`;
  const alertTemplate = alertType === 'success' ? alertSuccess.content : alertError.content;

  document.querySelector('body').append(alertTemplate.cloneNode(true));

  document.querySelector(closeButtonClass).addEventListener('click', handleCloseButtonClick);

  document.addEventListener('keydown', onKeyEscapeAlertKeydown);
  document.addEventListener('click', onEscapeClickOnDocument);

};

const showAlertGetImages = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export { showAlertSendForm, showAlertGetImages };
