var Waterline = require('waterline');


module.exports = Waterline.Collection.extend({

	identity: 'playlistitem',
	connection: 'myLocalMySql',

	attributes: {

		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		},

		playlist_id: {
			model: 'playlist',
			required: true
		},

		music_id: {
			model: 'music',
			required: true
		}
	}

});