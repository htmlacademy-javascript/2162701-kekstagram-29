import {renderThumbnails} from './thumbnails.js';
import {getPhotosPostedByUser} from './data.js';
import {initUploadForm} from './form-upload-user.js';

const photos = getPhotosPostedByUser(); //генерируем массив

renderThumbnails(photos); //отрисовывам миниатюры

initUploadForm();
