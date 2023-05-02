import { fetchImages } from "./fetchImages";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery")
const btnLoadMore = document.querySelector(".load-more")
let inputQuery =""
let page = 1;
form.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener("click", onLoadMore)


function onSubmit(evt){
evt.preventDefault();
inputQuery = evt.currentTarget.elements.searchQuery.value.trim();
clearGalleryList()
resetPage()
fetchImages(inputQuery, page)
.then(data => {
    if(data.hits.length === 0){
        Notiflix.Report.failure("Sorry, there are no images matching your search query. Please try again.");
        return btnLoadMore.hidden = true;
    }
    messegeAboutTotalHits(data.totalHits)
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits))
   const lightbox = new SimpleLightbox('.gallery a', { /* options */ });
    if(page !== data.totalHits){
      return btnLoadMore.hidden = false;
    }
    if(data.total=== data.totalHits){
       return btnLoadMore.hidden = true;
    }
    
})
.catch(err => console.log(err))}

function createMarkup (arr) {
    return arr.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) =>
    `<a href="${largeImageURL}"><div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="274" height="180px"/>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
  </div></a>`
    ).join('')
}
function clearGalleryList (){
gallery.innerHTML = '';
}
function onLoadMore (){
  page += 1;
  fetchImages(inputQuery, page)
  .then(data => {
  gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits))
lightbox.refresh()
  if(data.total=== data.totalHits){
  Notiflix.Report.info("We're sorry, but you've reached the end of search results.");
 btnLoadMore.hidden = true;
  }
  })
  .catch(err => console.log(err))}
  function resetPage(){
    page = 1;
  }

  function messegeAboutTotalHits(totalHits){
    Notiflix.Report.info(`Hooray! We found ${totalHits} images.`);
  }
