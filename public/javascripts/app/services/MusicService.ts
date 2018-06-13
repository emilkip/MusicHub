import Axios from 'axios';

export function create(newMusic: any) {
    const formData: FormData = new FormData();
    formData.append('title', newMusic.title);
    formData.append('author', newMusic.author);
    formData.append('album', newMusic.album);
    formData.append('genre', newMusic.genre);
    formData.append('file', newMusic.audio_file);

    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    };

    return Axios.post('/api/music/create', formData, config);
}

export function getAll() {
    return Axios.get('/api/music');
}

export function searchMusic(query: string) {
    return Axios.post('/api/music/search', { query });
}

export function searchAll(query: string) {
    return Axios.post('/api/music/search_all', { query });
}

export function getByID(id: string) {
    return Axios.get(`/api/music/${id}`);
}

export function getGenres() {
    return Axios.get(`/api/genres`);
}


export default {
    getByID,
    getAll,
    getGenres,
    create,
    searchMusic,
    searchAll
};
