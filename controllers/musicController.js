
var fs = require('fs'),
	Promise = require('bluebird'),
	slug = require('slug');


module.exports = {

	getAllGenre: function(req, res) {

		req.models.genre
			.find()
			.sort({ title: 'asc' })
			.then(function(genres) {
				res.json(genres);
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	editGenre: function(req, res) {

		var genreSlug = slug(req.body.title, { lower: true });

		req.models.genre
			.update({
				id: req.params.id
			}, {
				title: req.body.title,
				slug: genreSlug
			})
			.then(function(updatedGenre) {
				res.json({ status: true, genre: updatedGenre });
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	createGenre: function(req, res) {

		var genreSlug = slug(req.body.title, { lower: true });

		req.models.genre
			.create({
				title: req.body.title,
				slug: genreSlug
			})
			.then(function(createdGenre) {
				res.json({ status: true, genre: createdGenre });
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	deleteGenre: function(req, res) {

		req.models.genre
			.destroy({
				id: req.params.id
			})
			.then(function() {

				req.models.music
					.update({
						genre: req.params.id
					}, {
						genre: 0
					})
					.then(function() {
						res.json({ status: true});
					})
					.catch(function(err) {
						console.log(err);
					});
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	getAllMusic: function(req, res) {

		req.models.music
			.find()
			.populate('genre')
			.populate('author')
			.populate('album')
			.populate('creator')
			.sort({ createdAt: 'desc' })
			.then(function(music) {
				res.json(music);
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	getAllByGenre: function(req, res) {

		req.models.music
			.find({ genre: req.params.id })
			.populate('genre')
			.populate('author')
			.populate('album')
			.then(function(music) {
				res.json(music);
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	getAuthors: function(req, res) {

		req.models.author
			.find()
			.sort({ title: 'asc' })
			.then(function(authors) {
				res.json(authors);
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	createAuthor: function(req, res) {

		req.models.author
			.create({
				title: req.body.title
			})
			.then(function(author) {
				res.json(author);
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	getAlbumsByAuthor: function(req, res) {

		req.models.album
			.find({ author: req.body.id })
			.then(function(albums) {
				res.json(albums);
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	createAlbum: function(req, res) {

		var body = req.body,
			file = req.file,
			cover;

		if(!file) cover = 'music-placeholder.png';
		else cover = file.filename;


		req.models.album
			.create({
				author: req.body.author,
				title: req.body.title,
				cover: cover
			})
			.then(function(album) {
				res.json(album);
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	createMusic: function(req, res) {

		var file = req.file,
			body = req.body,
			audio;

		if(!file) audio = null;
		else audio = file.filename;


		req.models.music
			.create({

				author: body.author,
				title: body.title,
				album: body.album,
				genre: body.genre,
				audio: audio,
				creator: req.user.id
			})
			.then(function(createdMusic) {
				res.sendStatus(200);
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	getOne: function(req, res) {

		req.models.music
			.findOne({ id: req.params.id })
			.populate('genre')
			.populate('author')
			.populate('album')
			.populate('creator')
			.then(function(music) {
				res.json(music);
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	getAllProfileMusic: function(req, res) {

		req.models.music
			.find({ creator: req.user.id })
			.populate('genre')
			.populate('author')
			.populate('album')
			.sort({ createdAt: 'desc' })
			.then(function(music) {
				res.json(music);
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	getAllByUserId: function(req, res) {

		var id = req.params.id;

	},


	edit: function(req, res) {

		var body = req.body,
			file = req.file,
			audio;

		if(!file) audio = body.audio;
		else audio = file.filename;

		req.models.music
			.update({ id: req.params.id }, {
				author: body.author,
				title: body.title,
				album: body.album,
				genre: body.genre,
				audio: audio
			})
			.then(function() {
				res.sendStatus(200);
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	delete: function(req, res) {

		req.models.music
			.destroy({ id: req.params.id })
			.then(function(deletedMusic) {

				req.models.playlistitem
					.destroy({ music_id: deletedMusic[0].id })
					.then(function() {

						res.sendStatus(200);
					});

				fs.unlink('public/uploads/' + deletedMusic[0].cover, function(err) {
					if(err) console.log(err);
				});

				fs.unlink('public/uploads/' + deletedMusic[0].audio, function(err) {
					if(err) console.log(err);
				});
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	getAllAuthors: function(req, res) {

		req.models.album
			.find()
			.populate('author')
			.then(function(albums) {
				res.json({ status: true, albums: albums });
			})
			.catch(function(err) {
				console.log(err);
				res.json({ status: false });
			});
	}
};