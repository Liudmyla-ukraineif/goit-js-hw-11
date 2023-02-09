const axios = require('axios').default;

const API_KEY = '33450738-a5a6f333e8e5416cd1742bc4b';
const BASE_URL = 'https://pixabay.com/api/';


export default class InfoBySearch {

  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchSearch() {

    const data = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&min_height=100&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);

    this.increment();

    return data;
  }

  increment(){
    this.page += 1;
  }
  resetPage(){
    this.page = 1;
  }

  get query(){
    return this.searchQuery;
  }

  set query(NewQuery){
    this.searchQuery = NewQuery;
  }
}