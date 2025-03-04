import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://pixabay.com/',
    params: {
        key: '48977888-b03943cb340f5b9503aa6f8a3',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',     
        
    }
});

export async function getAllPhoto(params) {
    return await instance.get('api/', {params});    
};