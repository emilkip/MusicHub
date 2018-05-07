import Axios from 'axios';


export function createAlbum(album: any): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('title', album.title);
    formData.append('author', album.author);
    formData.append('file', album.cover_file);

    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    };
    return Axios.post('/api/album', formData, config);
}

export function getMusicForAlbum(id: string) {
    return Axios.get(`/api/album/${id}/music`)
}

export default {
    createAlbum,
    getMusicForAlbum
}
