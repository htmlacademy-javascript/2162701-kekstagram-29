import {renderThumbnails} from './thumbnails.js';
import {getPhotosPostedByUser} from './data.js';

const photos = getPhotosPostedByUser(); //генерируем массив

renderThumbnails(photos); //отрисовывам миниатюры
