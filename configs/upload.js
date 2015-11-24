
var multer = require('multer');


module.exports = {

	audio: multer({
		dest: 'public/audio'
	}),

	cover: multer({
		dest: 'public/images/cover'
	})
};