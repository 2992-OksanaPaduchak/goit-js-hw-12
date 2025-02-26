import "izitoast/dist/css/iziToast.min.css";

import iconError from "./img/iconError.svg";
import iziToast from "izitoast";
import { getAllPhoto } from './js/pixaday-api'
import { renderGallery } from './js/render-functions'


const form = document.querySelector('form');
const loader = document.querySelector('.loader__container');
const galleryImage = document.querySelector('ul.gallery');
const btnLoadMore = document.querySelector('.js-btn-load');

let params = {
    query: '',
    page: 1,
    total: [],
    per_page: 20,
}

form.addEventListener('submit', async (evt) => {

    console.log(evt)
    evt.preventDefault();

    const query = evt.target.query.value.trim()

    if (query === "") {
        return alert('Fill please field');
    }

    params = {
        ...params,
        query,
        page: 1,
        total: []
    }

    await requestData();
    
    if (!params.total.length) {
        const message = `'Sorry, there are no images matching your search query. Please try again!'`;
        iziToast.show({
            message,
            iconUrl: iconError,
            title: 'Erorr',
            titleColor: '#fff',
            titleSize: '16px',
            titleLineHeight: '24px',
            messageSize: '16px',
            messageLineHeight: '24px',
            messageColor: '#fff',
            backgroundColor: ' #ef4040',
            position: 'topRight',
        })
        return;
    }

    galleryImage.innerHTML = '';
    form.reset();
    renderGallery(params.total);
    checkBtnStatus();
})

btnLoadMore.addEventListener('click', async () => {

    params = {
        ...params,
        page: params.page + 1,
    }

    await requestData();

    renderGallery(params.total);
    checkBtnStatus();
    scrollGallery();
});


function checkBtnStatus() {

    if (params.total.length < params.per_page) {
        btnLoadMore.classList.add('hidden');
        iziToast.show({
            message: "We're sorry, but you've reached the end of search results.",
            backgroundColor: "#ef4040",
            messageColor: "#fff",
            position: "bottomRight",
        });
    } else {
        btnLoadMore.classList.remove('hidden');    
    }
};

function scrollGallery() {
    const height = galleryImage.firstElementChild.getBoundingClientRect().height
    window.scrollBy({
        top: height * 2,
        behavior: 'smooth'
    })
}

function requestData() {
    loader.style.display = 'flex'

    return new Promise(async (resolve, reject) => {
        try {
            
            const res = await getAllPhoto({
                q: params.query,
                page: params.page,
                perPage: params.per_page
            });

            params.total = res.data.hits;

            loader.style.display = 'none'
            
            resolve(params.total);
        } catch (e) {
            reject(e);
            loader.style.display = 'none'
        }
    })
}