(function() {

	angular
		.module('profileCtrl', [])

		.controller('profilePageCtrl', ['$scope', '$http', '$routeParams',
			function($scope, $http, $routeParams) {

				$scope.newPlModalVis = false;
				$scope.newPl = {};
				$scope.newPl.music = [];

				$http
					.get('/api/profile/music')
					.then(function(music) {

						$scope.music = music.data;
					});

				$http
					.get('/api/profile/playlists')
					.then(function(playlists) {

						$scope.playlists = playlists.data;
					});

				$scope.getPlaylistItem = function(id) {

					$scope.playlistItems = undefined;

					$http
						.get('/api/playlist/' + id + '/items')
						.then(function(music) {

							for(var i = 0; i < $scope.playlists.length; i += 1) {

								if($scope.playlists[i].id == id) {

									$scope.playlists[i].items = music.data;
									$scope.playlistItems = $scope.playlists[i].items;
								}
							}
						});
				}

				$scope.isEmpty = function() {

					if($scope.newPl.music.length == 0)
						return true;

					return false;
				}

				$scope.plModalShow = function() {

					$scope.newPlModalVis = true;

					$http
						.get('/api/music')
						.then(function(music) {

							$scope.modalMusic = music.data;
						});
				}

				$scope.itemIsExistInPl = function(item) {

					for(var i = 0; i < $scope.newPl.music.length; i += 1) {
						if($scope.newPl.music[i].id == item.id)
							return true;
					}
					return false;
				}

				$scope.addItemToPl = function(music) {

					if(!$scope.itemIsExistInPl(music))
						$scope.newPl.music.push(music);
				}

				$scope.removeItemInPl = function(index) {

					$scope.newPl.music.splice(index, 1);
				}

				$scope.newPlaylist = function(playlist) {

					if(playlist.music.length == 0)
						$scope.errNote = 'Добавьте композиции в плейлист';

					else if(!$scope.newPl.title)
						$scope.errNote = 'Дайте название вашему плейлисту';

					else {

						$scope.errNote = undefined;

						$http({
							url: '/api/playlist/add',
							method: 'POST',
							data: playlist
						})
						.then(function(res) {
							$scope.playlists.unshift(res.data);
							$scope.newPlModalVis = false;
						})
						.catch(function(err) {
							console.log(err);
						});
					}
				}

				$scope.deleteMusic = function(index, music) {

					$http({
						url: '/api/music/' + music.id + '/delete',
						method: 'POST'
					})
					.then(function() {
						$scope.music.splice(index, 1);
					})
					.catch(function(err) {
						console.log(err);
					});
				}

				$scope.deletePlaylist = function(index, playlist) {

					$http({
						url: '/api/playlist/' + playlist.id + '/delete',
						method: 'POST',
						data: playlist
					})
					.then(function(result) {
						$scope.playlists.splice(index, 1);
					});
				}
			}
		])

		.controller('playistEditCtrl', ['$scope', '$http', '$routeParams', '$window',
			function($scope, $http, $routeParams, $window){

				$scope.editPl = {};
				$scope.editPl.music = [];

				$http
					.get('/api/playlist/' + $routeParams.id)
					.then(function(playlist) {
						$scope.editPl.title = playlist.data.title;
						$scope.playlist = playlist.data;
					});

				$http
					.get('/api/playlist/' + $routeParams.id + '/items')
					.then(function(items) {
						items.data.forEach(function(item, i) {

							$scope.editPl.music.push(item.music);
						});
					});

				$http
					.get('/api/music')
					.then(function(music) {
						$scope.music = music.data;
					});

				$scope.isEmpty = function() {

					if($scope.editPl.music.length == 0)
						return true;

					return false;
				}

				$scope.removeItemInPl = function(index) {

					$scope.editPl.music.splice(index, 1);
				}

				$scope.itemIsExistInPl = function(item) {

					for(var i = 0; i < $scope.editPl.music.length; i += 1) {
						if($scope.editPl.music[i].id == item.id)
							return true;
					}
					return false;
				}

				$scope.addItemToPl = function(music) {

					if(!$scope.itemIsExistInPl(music))
						$scope.editPl.music.push(music);
				}

				$scope.editPlaylist = function(playlist) {

					$http({
						url: '/api/playlist/' + $routeParams.id + '/edit',
						method: 'POST',
						data: playlist
					})
					.then(function(result) {
						$window.location = '#/profile';
					});
				}
			}
		]);

})();
