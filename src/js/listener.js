import refs from './refs';
import api from './apiService';
import updateImagesMarckup from './updateImagesMarckup';
import message from './messageForUser';
import * as basicLightbox from 'basiclightbox';
import '../css/basicLightbox.scss';
import lazyLoad from './lazyLoad';

const listener = {
  submit(event) {
    event.preventDefault();
    api.query = event.target.firstElementChild.value;
    this.reset();
    this.fetch();
  },
  reset() {
    refs.gallery.innerHTML = '';
    refs.searchForm.reset();
    api.pageReset();
    message.clearAllMesssage();
  },
  fetch() {
    api.fetch().then(data => {
      if (data.total > 0) {
        message.success(data.total);
        updateImagesMarckup(data.hits);
        lazyLoad();
      } else {
        message.error();
      }
    });
  },
  showLargeImage(event) {
    if (event.target.nodeName !== 'IMG') {
      return;
    }
    basicLightbox
      .create(
        `<img src="${event.target.dataset.large}" width="800" height="600">`,
      )
      .show();
  },
};

refs.searchForm.addEventListener('submit', listener.submit.bind(listener));
refs.gallery.addEventListener('click', listener.showLargeImage.bind(listener));
