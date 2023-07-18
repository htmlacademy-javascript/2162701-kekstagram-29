import {renderThumbnails} from './thumbnails.js';
import {getPhotosPostedByUser} from './data.js';
import { setOnFormSubmit, closeUserOverlay} from './form-upload-user.js';
import { getData, sendData } from './api.js';
import { showAlert } from './alert.js';
import { showSuccessMessage, showErrorMessage } from './massage.js';

const photos = getPhotosPostedByUser(); //генерируем массив

renderThumbnails(photos); //отрисовывам миниатюры

//setOnFormSubmit(); //форма загрузки

//отправка формы
setOnFormSubmit(async (data) =>{
  try {
    await sendData(data);
    closeUserOverlay();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderThumbnails(data);
} catch (error) {
  showAlert(error.message);
}
