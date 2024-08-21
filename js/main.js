import { createPictures } from './create-pictures.js';
import { initFormModal } from './open-form-modal.js';
import { getData } from './api.js';
import { showAlert } from './dialogs.js';

initFormModal();

try {
  const descriptions = await getData();
  createPictures(descriptions);
} catch(err) {
  showAlert(err.message);
}
