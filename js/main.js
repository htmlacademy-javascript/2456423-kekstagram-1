import { initFormModal } from './open-form-modal.js';
import { getData } from './api.js';
import { showAlert } from './dialogs.js';
import { renderPictures } from './render-pictures.js';
import{ initFilters } from './init-filters.js';

initFormModal();

try {
  const gallary = await getData();
  renderPictures(gallary);
  initFilters(gallary);
} catch(err) {
  showAlert(err.message);
}
