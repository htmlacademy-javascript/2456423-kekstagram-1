import {createDescription} from './data.js';
import {createPictures} from './create-pictures.js';
import{openFormModal} from './open-form-modal.js';

const uploadFile = document.querySelector('#upload-file');
const descriptions = createDescription();
createPictures(descriptions);

uploadFile.addEventListener('change', openFormModal);
