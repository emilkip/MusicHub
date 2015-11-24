var Waterline = require('waterline');


module.exports = Waterline.Collection.extend({

	identity: 'album',
	connection: 'myLocalMySql',

	attributes: {

		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		},

		author: {
			model: 'author',
			via: 'album'
		},

		title: {
			type: 'string',
			required: true
		},

		cover: {
			type: 'string'
		}
	}

});