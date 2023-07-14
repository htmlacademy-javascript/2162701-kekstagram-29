import {renderThumbnails} from './thumbnails.js';
import {getPhotosPostedByUser} from './data.js';
import {openUploadForm} from './form-upload-user.js';

const photos = getPhotosPostedByUser(); //генерируем массив

renderThumbnails(photos); //отрисовывам миниатюры

openUploadForm(); //открытие формы и проверка на валидацию


