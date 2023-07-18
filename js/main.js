import {renderThumbnails} from './thumbnails.js';
import { setOnFormSubmit, closeUserOverlay} from './form-upload-user.js';
import { getData, sendData } from './api.js';
import { showAlert } from './alert.js';
import { showSuccessMessage, showErrorMessage } from './massage.js';


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
