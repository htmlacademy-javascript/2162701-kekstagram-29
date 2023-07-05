import {createThumbnail} from './mini-pictures.js';
import {getPhotoPostedByUser} from './data.js';
//import {openUserBigFoto} from './big-pictures.js';

const photos = getPhotoPostedByUser(); //отрисовываем миниатюры

createThumbnail(photos);
