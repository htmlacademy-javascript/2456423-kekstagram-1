import { initFormModal } from './open-form-modal.js';
import { getData } from './api.js';
import { showAlert } from './dialogs.js';
import { initPictures } from './pictures.js';

initFormModal();

try {
  const gallary = await getData();
  initPictures(gallary);

} catch(err) {
  showAlert(err.message);
}
