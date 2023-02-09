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
    clearConteiner();
    return errorMeseges();
  }

  newSearchInfo.resetPage();

  try {
    newSearchInfo.fetchSearch().then(data => {
      clearConteiner();
      refs.loadMoreBtn.classList.remove('is-hidden');
      // refs.loadMoreBtn.disabled = true;
      // if (hits.length === 0) {
      //   return Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`)
      // }
      
      appendMarkup(data);
    })
  } catch (error) {
    errorMeseges()
  }
}

function onMoreElements() {
  refs.loadMoreBtn.disabled = false;
  newSearchInfo.fetchSearch().then(appendMarkup);
  refs.loadMoreBtn.disabled = true;
}

function appendMarkup({ hits, totalHits }) {
  refs.loadMoreBtn.disabled = true;
  refs.gallery.insertAdjacentHTML('beforeend', cardSearch(hits));

  Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`)
  refs.loadMoreBtn.disabled = false;
}

function clearConteiner() {
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
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