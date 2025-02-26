import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

function renderItemGallery(item) {
    return `
        <li class="gallery-item">
            <a class="gallery-link" href="${item.largeImageURL}">
                <img class="gallery-image"
                src="${item.webformatURL}"
                data-source="${item.largeImageURLl}"
                alt="${item.tags}"/>
            </a>
            <div class="photo-info">
                <span>likes: ${item.likes}</span>
                <span>Views: ${item.views}</span>
                <span>Comments: ${item.comments}</span>
                <span>Downloads: ${item.downloads}</span>
            </div>
        </li>
    `
}

export function renderGallery(listHits) {
    const listHTML = listHits
        .map(item => renderItemGallery(item))
        .join('');
    
    document.querySelector('ul.gallery').insertAdjacentHTML('beforeend', listHTML)
    
     new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
     });
}