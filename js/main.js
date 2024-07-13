import {createDescription} from './data.js';
import {createPictures} from './create-pictures.js';
import {createFullScreenPicture} from './create-fullscreenpicture.js';

const descriptions = createDescription();
console.log(descriptions);
createPictures(descriptions);

createFullScreenPicture(descriptions);
