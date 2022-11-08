// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line
const galleryContainer = document.querySelector('.gallery');
const galleryCard = createGalleryItems(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryCard);
galleryContainer.addEventListener('click', onClickImg);

function createGalleryItems(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href="${original}">
    <img class="gallery__image" src="${preview}"
    alt="${description}"/></a>`;
    })
    .join('');
}
let gallery = ``;
function onClickImg(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  gallery = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
    captionPosition: 'bottom',
  });
}
