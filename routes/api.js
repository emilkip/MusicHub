var express = require('express'),
	Music = require('../controllers/musicController'),
	User = require('../controllers/userController'),
	Playlist = require('../controllers/playlistController'),
	upload = require('../configs/upload');


var api = express.Router();

//=======================================
// Music
//=======================================
api.get('/genres', Music.getAllGenre);
api.post('/genres/:id/edit', Music.editGenre);
api.post('/genres/:id/delete', Music.deleteGenre);
api.post('/genres/create', Music.createGenre);
api.get('/music', Music.getAllMusic);
api.post('/music/create', upload.audio.single('file'), Music.createMusic);
api.get('/music/:id', Music.getOne);
api.get('/music/genre/:id', Music.getAllByGenre);
api.post('/music/:id/edit', upload.audio.single('file'), Music.edit);
api.post('/music/:id/delete', Music.delete);


//=======================================
// Authors
//=======================================
api.get('/author', Music.getAuthors);
api.get('/author/albums', Music.getAllAuthors);
api.post('/author/create', Music.createAuthor);


//=======================================
// Albums
//=======================================
api.post('/album', Music.getAlbumsByAuthor);
api.post('/album/create', upload.cover.single('file'), Music.createAlbum);


//=======================================
// Profile
//=======================================
api.get('/profile/music', Music.getAllProfileMusic);
api.get('/profile/playlists', Playlist.getAllProfilePlaylists);
api.get('/profile/:id/music', Music.getAllByUserId);


//=======================================
// Playlist
//=======================================
api.get('/playlist/:id', Playlist.getPlaylist);
api.get('/playlist/:id/items', Playlist.getPlaylistItem);
api.post('/playlist/:id/edit', Playlist.editPlaylist);
api.post('/playlist/:id/delete', Playlist.deletePlaylist);
api.post('/playlist/add', Playlist.createPlaylist);





module.exports = api;