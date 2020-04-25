import api from './apiService';
import updateImagesMarckup from './updateImagesMarckup';
import refs from './refs';

const options = {
  rootMargin: '20px',
};

const onEntry = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      api.fetch(true).then(data => {
        updateImagesMarckup(data);
        lazyLoad();
      });
      observer.unobserve(entry.target);
    }
  });
};

const lazyLoad = () => {
  new IntersectionObserver(onEntry, options).observe(
    refs.gallery.lastElementChild,
  );
};

export default lazyLoad;
