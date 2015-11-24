var Waterline = require('waterline'),
	connectConfig = require('./waterline-config');

// Models
var Users = require('../models/User'),
	Music = require('../models/Music'),
	Album = require('../models/Album'),
	Author = require('../models/Author'),
	Genre = require('../models/Genre'),
	Playlist = require('../models/Playlist'),
	PlaylistItem = require('../models/PlaylistItem');

var orm = new Waterline();


orm.loadCollection(Users);
orm.loadCollection(Music);
orm.loadCollection(Album);
orm.loadCollection(Author);
orm.loadCollection(Genre);
orm.loadCollection(Playlist);
orm.loadCollection(PlaylistItem);


module.exports.initialize = function(app, PORT, callback) {

	orm.initialize(connectConfig, function(err, models) {
		if(err) throw err;

		callback(models.collections, models.connections);

	});
}
