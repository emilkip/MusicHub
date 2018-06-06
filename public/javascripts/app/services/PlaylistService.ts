import Axios from 'axios';

export function getPlaylist(id: string) {
    return Axios.get(`/api/playlist/${id}`);
}

export function getPlaylists() {
    return Axios.get('/api/playlists');
}

export function cratePlaylist(playlist: any) {
    return Axios.post('/api/playlist', playlist);
}

export default {
    getPlaylist,
    getPlaylists,
    cratePlaylist
}
