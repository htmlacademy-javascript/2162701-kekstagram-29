import {renderThumbnails} from './thumbnails.js';
import {getPhotosPostedByUser} from './data.js';
import {openUploadForm} from './form-upload-user.js';

const photos = getPhotosPostedByUser(); //генерируем массив

renderThumbnails(photos); //отрисовывам миниатюры

openUploadForm();

//import './form-validation.js';
//import './form-upload-user.js';
//import './modal-big-photos.js';
//import './thumbnails.js';

