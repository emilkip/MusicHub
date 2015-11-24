

module.exports = {

	getPlaylist: function(req, res) {

		req.models.playlist
			.findOne({ id: req.params.id })
			.then(function(playlist) {
				res.json(playlist);
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	getAllProfilePlaylists: function(req, res) {

		req.models.playlist
			.find({ owner: req.user.id })
			.sort({ createdAt: 'desc' })
			.then(function(playlists) {

				res.json(playlists);
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	getPlaylistItem: function(req, res) {

		req.models.playlistitem
			.find({ playlist_id: req.params.id })
			.sort({ createdAt: 'desc' })
			.then(function(items) {

				if(items.length == 0)
					res.sendStatus(404);

				var iter = 0;

				items.forEach(function(item, i) {

					req.models.music
						.findOne({ id: item.music_id })
						.populate('author')
						.populate('album')
						.then(function(track) {

							items[iter].music_id = track;
							++iter;

							if(iter == items.length)
								res.json(items);
						});
				});
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	createPlaylist: function(req, res) {

		var body = req.body;

		req.models.playlist
			.create({
				title: body.title,
				owner: req.user.id
			})
			.then(function(createdPlaylist) {

				body.music.forEach(function(item, i) {

					req.models.playlistitem
						.create({
							playlist_id: createdPlaylist.id,
							music_id: item.id
						})
						.then(function() {})
						.catch(function(err) {
							console.log(err);
						});
				});

				res.json(createdPlaylist);
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	deletePlaylist: function(req, res) {

		req.models.playlist
			.destroy({ id: req.body.id })
			.then(function(deletedPl) {

				req.models.playlistitem
					.destroy({ playlist_id: req.body.id })
					.then(function() {
						res.json({ status: true });
					})
					.catch(function(err) {
						console.log(err);
					});
			})
			.catch(function(err) {
				console.log(err);
			});
	},


	editPlaylist: function(req, res) {

		var body = req.body;

		req.models.playlist
			.update({
				id: req.params.id
			}, {
				title: body.title
			})
			.then(function(updatedPl) {

				req.models.playlistitem
					.destroy({ playlist_id: req.params.id })
					.then(function(updatedPlaylist) {

						body.music.forEach(function(item, i) {

							req.models.playlistitem
								.create({
									playlist_id: req.params.id,
									music_id: item.id
								})
								.then(function() {})
								.catch(function(err) {
									console.log(err);
								});
						});

						res.json(updatedPlaylist);
					})
					.catch(function(err) {
						console.log(err);
					});
			})
			.catch(function(err) {
				console.log(err);
			});
	}
};