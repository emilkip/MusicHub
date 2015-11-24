var Waterline = require('waterline');


module.exports = Waterline.Collection.extend({

	identity: 'genre',
	connection: 'myLocalMySql',

	attributes: {

		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		},

		title: {
			type: 'string',
			required: true
		},

		slug: {
			type: 'string',
			required: true
		}
	}

});