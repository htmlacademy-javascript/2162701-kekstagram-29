import {createThumbnail} from './mini-pictures.js';
import {getPhotoPostedByUser} from './data.js';

const drawThumbnails = getPhotoPostedByUser(); //отрисовываем миниатюры

createThumbnail(drawThumbnails);
