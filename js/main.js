import { createPictures } from './create-pictures.js';
import { createFormModal } from './open-form-modal.js';
import { getData } from './api.js';
import { showAlertGetImages } from './show-alert.js';

createFormModal();

try {
  const descriptions = await getData();
  createPictures(descriptions);
} catch(err) {
  showAlertGetImages(err.message);
}
