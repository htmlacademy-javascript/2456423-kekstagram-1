import {createDescription} from './data.js';
import {createPictures} from './create-pictures.js';
import{createFormModal} from './open-form-modal.js';

const descriptions = createDescription();
createPictures(descriptions);

createFormModal();
