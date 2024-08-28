import { initFormModal } from './form-modal.js';
import { getData } from './api.js';
import { showAlert } from './dialogs.js';
import { initGallery } from './pictures.js';
import{ initFilters } from './filters.js';

initFormModal();

try {
  const data = await getData();
  initGallery(data);
  initFilters();
} catch(err) {
  showAlert(err.message);
}
