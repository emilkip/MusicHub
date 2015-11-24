var Waterline = require('waterline');


module.exports = Waterline.Collection.extend({

	identity: 'author',
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
		}
	}

});