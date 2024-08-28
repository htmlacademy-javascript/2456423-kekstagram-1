import { initFormModal } from './form-modal.js';
import { getData } from './api.js';
import { showAlert } from './dialogs.js';
import { initGallary } from './pictures.js';
import{ initFilters } from './filters.js';

initFormModal();

try {
  const gallary = await getData();
  initGallary(gallary);
  initFilters();

} catch(err) {
  showAlert(err.message);
}
