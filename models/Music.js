var Waterline = require('waterline');


module.exports = Waterline.Collection.extend({

	identity: 'music',
	connection: 'myLocalMySql',

	attributes: {

		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		},

		author: {
			model: 'author',
			via: 'music',
			required: true
		},

		title: {
			type: 'string',
			required: true
		},

		genre: {
			model: 'genre',
			required: true
		},

		album: {
			model: 'album',
			via: 'music',
			required: true
		},

		audio: {
			type: 'string'
		},

		creator: {
			model: 'users',
			required: true
		}
	}
});