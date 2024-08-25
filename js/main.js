import { initFormModal } from './open-form-modal.js';
import { getData } from './api.js';
import { showAlert } from './dialogs.js';
import {filters} from './filters.js';

initFormModal();

try {
  const descriptions = await getData();
  filters(descriptions);
} catch(err) {
  showAlert(err.message);
}
