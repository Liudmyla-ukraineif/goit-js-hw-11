import cardSearch from '../src/templates/cardColection.hbs';
import NewSearchInfo from './api-servis';
import Notiflix from "notiflix";

// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more')
};
const newSearchInfo = new NewSearchInfo;

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onMoreElements);
refs.loadMoreBtn.classList.add('is-hidden');

function onSearch(e) {
  e.preventDefault();

  newSearchInfo.query = e.currentTarget.elements.searchQuery.value.trim();

  if (newSearchInfo.query === '') {
    refs.loadMoreBtn.classList.add('is-hidden');
    clearConteiner();
    return errorMeseges();
  }

  newSearchInfo.resetPage();
  newSearchInfo.fetchSearch().then(data => {
    clearConteiner()
    refs.loadMoreBtn.classList.remove('is-hidden')
    refs.loadMoreBtn.classList.add('disabled')
    appendMarkup(data)
  });
}

function onMoreElements() {
  newSearchInfo.fetchSearch().then(appendMarkup)
}

function appendMarkup(data) {
  refs.gallery.insertAdjacentHTML('beforeend', cardSearch(data.hits));
  refs.loadMoreBtn.classList.remove('disabled');
  Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`)
}

function clearConteiner() {
  refs.gallery.innerHTML = '';
}

function errorMeseges() {
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}
// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.