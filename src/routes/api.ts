import * as express from 'express';
import * as MusicCtrl from '../controllers/musicController';
import * as GenreCtrl from '../controllers/genreController';
import * as AuthorCtrl from '../controllers/authorController';
import * as AlbumCtrl from '../controllers/albumController';
import * as UserCtrl from '../controllers/userController';
import * as PlaylistCtrl from '../controllers/playlistController';
import {uploadConfig} from '../configs/upload';
import {uploadCover} from '../common/FileUpload';


const api = express.Router();

//=======================================
// Music
//=======================================
api.get('/music', MusicCtrl.getAllMusic);
api.get('/music/:id', MusicCtrl.getOne);
api.post('/music/:id/edit', uploadConfig.audio.single('file'), MusicCtrl.edit);
api.delete('/music/:id', MusicCtrl.deleteMusic);
api.post('/music/search', MusicCtrl.search);
api.post('/music/search_all', MusicCtrl.searchAll);
api.post('/music/create', uploadConfig.audio.single('file'), MusicCtrl.createMusic);
api.get('/music/genre/:id', MusicCtrl.getAllByGenre);
api.get('/audio/:id', MusicCtrl.getAudio);


//=======================================
// Genres
//=======================================
api.get('/genres', GenreCtrl.getAllGenre);
api.post('/genres/create', GenreCtrl.createGenre);
api.put('/genres/:id', GenreCtrl.editGenre);
api.delete('/genres/:id', GenreCtrl.deleteGenre);


//=======================================
// Authors
//=======================================
api.get('/author', AuthorCtrl.getAuthors);
api.get('/author/:id/albums', AuthorCtrl.getAllAlbumsForAuthor);
api.post('/author', AuthorCtrl.createAuthor);


//=======================================
// Albums
//=======================================
api.post('/album/author/:id', AlbumCtrl.getAlbumsByAuthor);
api.post('/album', uploadCover(), AlbumCtrl.createAlbum);
api.get('/album/:id/music', AlbumCtrl.getMusic);


//=======================================
// Profile
//=======================================
api.get('/profile/get_user', UserCtrl.getUser);
api.get('/profile/music', MusicCtrl.getAllProfileMusic);
api.get('/profile/playlists', PlaylistCtrl.getAllProfilePlaylists);
api.get('/profile/:id/music', MusicCtrl.getAllByUserId);


//=======================================
// Playlist
//=======================================
api.get('/playlists', PlaylistCtrl.getPlaylists);
api.post('/playlist', PlaylistCtrl.createPlaylist);
api.get('/playlist/favorite', PlaylistCtrl.getFavoriteMusic);
api.post('/playlist/favorite/add', PlaylistCtrl.addToFavorite);
api.get('/playlist/:id', PlaylistCtrl.getPlaylist);
api.get('/playlist/:id/items', PlaylistCtrl.getPlaylistItem);
api.post('/playlist/:id/edit', PlaylistCtrl.editPlaylist);
api.post('/playlist/:id/delete', PlaylistCtrl.deletePlaylist);


//=======================================
// Other
//=======================================


export default api;
