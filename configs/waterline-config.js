var sqlAdapter = require('sails-mysql');

module.exports = {

	adapters: {
		'default': sqlAdapter,
		mysql: sqlAdapter
	},

	connections: {

		myLocalMySql: {
			adapter: 'mysql',
			host: 'localhost',
			port: 3306,
			user: 'root',
			password: '160694',
			database: 'KipMusic'
		}
	},

	defaults: {

		migrate: 'alter'
	}
};

