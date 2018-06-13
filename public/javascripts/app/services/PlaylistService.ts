import Axios from 'axios';

export function getPlaylist(id: string) {
    return Axios.get(`/api/playlist/${id}`);
}

export function getPlaylists() {
    return Axios.get('/api/playlists');
}

export function getFavoriteMusic() {
    return Axios.get('/api/playlists/favorite');
}

export function addToFavorite(musicId: string) {
    return Axios.post('/api/playlists/favorite', { musicId });
}

export function cratePlaylist(playlist: any) {
    return Axios.post('/api/playlist', playlist);
}

export default {
    getPlaylist,
    getPlaylists,
    cratePlaylist,
    getFavoriteMusic,
    addToFavorite
}
