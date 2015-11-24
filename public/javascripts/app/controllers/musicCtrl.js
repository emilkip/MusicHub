(function() {

	angular
		.module('musicCtrl', [])

		.controller('musicCreateCtrl', ['$scope', '$http', '$location', '$timeout', 'Upload', 
			function($scope, $http, $location, $timeout, Upload) {

				$scope.successVis = false;

				$http
					.get('/api/genres')
					.then(function(genres) {
						$scope.genres = genres.data;
					});

				$http
					.get('/api/author')
					.then(function(authors) {
						$scope.authors = authors.data;
					});

				$scope.selectAuthor = function(author) {

					$http({
						url: '/api/album',
						method: 'POST',
						data: { id: author }
					})
					.then(function(albums) {
						$scope.albums = albums.data;
					});
				}

				$scope.showModal = function(type) {

					$scope.modalVis = true;

					if(type == 1) {
						$scope.addTitle = 'Новый исполнитель';
						$scope.addType = 'author';
					}
					if(type == 2) {
						$scope.addTitle = 'Новый альбом';
						$scope.addType = 'album';
					}
				}

				$scope.isAuthorExist = function(author) {
					for(var i = 0; i < $scope.authors.length; i += 1) {
						if($scope.authors[i].title.toLowerCase() == author.toLowerCase())
							return true;
					}
					return false;
				}

				$scope.createAuthor = function(author) {

					if($scope.isAuthorExist(author.title)) {
						$scope.errNote = 'Исполнитель уже существует';
					} else {
						$scope.errNote = undefined;
						$scope.successVis = true;

						$http({
							url: '/api/author/create',
							method: 'POST',
							data: { title: author.title }
						})
						.then(function(author) {

							$timeout(function() {
								$scope.successVis = true;
								$scope.modalVis = false;
								$scope.successVis = false;
							}, 1500);
							$scope.authors.push(author.data);
						});
					}
				}

				$scope.isAlbumExist = function(album) {
					for(var i = 0; i < $scope.albums.length; i += 1) {
						if($scope.albums[i].title.toLowerCase() == album.toLowerCase())
							return true;
					}
					return false;
				}

				$scope.createAlbum = function(album, cover, author) {

					if($scope.isAlbumExist(album.title)) {
						$scope.errNote = 'Такой альбом уже существует';
					} else {
						$scope.errNote = undefined;
						$scope.successVis = true;

						Upload.upload({
							url: '/api/album/create',
							method: 'POST',
							fields: {
								title: album.title,
								author: author
							},
							file: cover
						})
						.then(function(album) {
							$timeout(function() {
								$scope.successVis = true;
								$scope.modalVis = false;
								$scope.successVis = false;
							}, 1500);
							$scope.albums.push(album.data);
						});
					}
				}

				$scope.createMusic = function(music) {

					Upload.upload({
						url: '/api/music/create',
						method: 'POST',
						headers: {
							'Content-Type': 'multipart/form-data'
						},
						fields: music,
						file: $scope.audio
					})
					.then(function () {
						$location.path('/');
					})
					.catch(function(err) {
						console.log(err);
					});
				}
			}
		])

		.controller('musicPageCtrl', ['$scope', '$http', '$routeParams', '$sce', 
			function($scope, $http, $routeParams, $sce) {

				$http
					.get('/api/music/' + $routeParams.id)
					.then(function(music) {

						$scope.music = music.data;

						var wavesurfer = Object.create(WaveSurfer);

						wavesurfer.init({
							container: '#player',
							waveColor: 'violet',
							progressColor: 'purple'
						});

						wavesurfer.load('/audio/' + music.data.audio);

						$scope.play = function() {
							wavesurfer.playPause();
						}

						$scope.forward = function() {
							wavesurfer.skipForward();
						}

						$scope.backward = function() {
							wavesurfer.skipBackward();
						}

						$scope.stop = function() {
							wavesurfer.stop();
						}

						$scope.$on('$routeChangeStart', function(next, current) { 
							wavesurfer.stop();
						});
					})
					.catch(function(err) {
						console.log(err);
					});
			}
		])

		.controller('musicEditCtrl', ['$scope', '$http', '$routeParams', '$location', 'Upload', 
			function($scope, $http, $routeParams, $location, Upload) {

				$scope.editMusic = {};
				$scope.editMusic.author = '';
				$scope.editMusic.album = '';

				$http
					.get('/api/genres')
					.then(function(genres) {
						$scope.genres = genres.data;
					});

				$http
					.get('/api/music/' + $routeParams.id)
					.then(function(music) {
						$scope.music = music.data;
						$scope.editMusic.title = $scope.music.title;
						$scope.editMusic.genre = $scope.music.genre.id || 0;
						$scope.editMusic.author = $scope.music.author.id;
						$scope.editMusic.album = $scope.music.album.id;
						$scope.editMusic.audio = $scope.music.audio;
					})

				$http
					.get('/api/author')
					.then(function(authors) {
						$scope.authors = authors.data;
					});

				$scope.selectAuthor = function(author) {

					$http({
						url: '/api/album',
						method: 'POST',
						data: { id: author }
					})
					.then(function(albums) {
						$scope.albums = albums.data;
					});
				}


				$scope.saveMusic = function(music) {

					if(!$scope.audio) {

						$http({
							url: '/api/music/' + $routeParams.id + '/edit',
							method: 'POST',
							data: music
						})
						.then(function () {
							$location.path('/');
						})
						.catch(function(err) {
							console.log(err);
						});

					} else {

						Upload.upload({
							url: '/api/music/' + $routeParams.id + '/edit',
							method: 'POST',
							headers: {
								'Content-Type': 'multipart/form-data'
							},
							fields: music,
							file: $scope.audio
						})
						.then(function () {
							$location.path('/');
						})
						.catch(function(err) {
							console.log(err);
						});
					}
				}
			}
		])


		.controller('genreMusicCtrl', ['$scope', '$http', '$routeParams', 
			function($scope, $http, $routeParams){

				$http
					.get('/api/genres')
					.then(function(genres) {

						var id = 0,
							title = '';

						if($routeParams.title == 0) {
							title = 'Без жанра';
						} else {
							for(var i = 0; i < genres.data.length; i += 1) {
								if(genres.data[i].slug == $routeParams.title) {
									id = genres.data[i].id;
									title = genres.data[i].title;
									break;
								}
							}
						}

						$http
							.get('/api/music/genre/' + id)
							.then(function(music) {
								if(music.data.length == 0)
									$scope.resultNote = 'В данном жанре (' + title + ') нет композиций';
								$scope.music = music.data;
							});
					});
			}
		]);

})();