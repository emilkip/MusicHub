var Waterline = require('waterline'),
	bcrypt = require('bcrypt');


module.exports = Waterline.Collection.extend({

	identity: 'users',
	connection: 'myLocalMySql',

	attributes: {

		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		},

		username: {
			type: 'string',
			required: true
		},

		password: {
			type: 'string',
			required: true
		},

		admin: {
			type: 'boolean',
			defaultsTo: false
		}
	},

	beforeCreate: function(user, next) {

		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(user.password, salt, function(err, hash) {

				if (err) {
					console.log(err);
					next(err);
				} else {
					user.password = hash;
					next();
				}
			});
		});
	}
});