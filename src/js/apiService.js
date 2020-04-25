import axios from 'axios';
export default {
  baseUrl: 'https://pixabay.com/api/',
  key: '&key=16188386-9c486355758a5fe84f7a70228',
  page: 1,
  set query(search) {
    this.searchQuery = search;
  },
  pageReset() {
    this.page = 1;
  },
  pageIncrement() {
    this.page += 1;
  },
  parameters() {
    return `?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12`;
  },
  fullUrl() {
    return this.baseUrl + this.parameters() + this.key;
  },
  async fetch(load = false) {
    return load
      ? (this.pageIncrement(),
        await axios.get(this.fullUrl()).then(response => response.data.hits))
      : await axios.get(this.fullUrl()).then(response => response.data);
  },
};
