(function() {

	angular
		.module('dashboardCtrl', [])

		.controller('dashboardCtrl', ['$scope', '$http', '$location', 
			function($scope, $http, $location) {

				$http
					.get('/current_user')
					.then(function(user) {
						if(!user.data.admin)
							$location.path('/');
					});
			}
		])

		.controller('dashboardGenreCtrl', ['$scope', '$http', '$location', 
			function($scope, $http, $location) {

				$http
					.get('/current_user')
					.then(function(user) {
						if(!user.data.admin)
							$location.path('/');
					});

				$scope.editGenreVis = false;

				$http
					.get('/api/genres')
					.then(function(genres) {
						$scope.genres = genres.data;
					});

				$scope.showEditModal = function(genre, index) {
					$scope.editGenreIndex = index;
					$scope.editErrNote = undefined;
					$scope.editGenreVis = true;
					$scope.editGenre = genre.title;
					$scope.editGenreId = genre.id;
				}

				$scope.edit = function(genre) {

					if(!$scope.checkExist(genre)) {

						$http({
							url: '/api/genres/' + $scope.editGenreId + '/edit',
							method: 'POST',
							data: { title: genre }
						})
						.then(function(resGenre) {
							$scope.genres[$scope.editGenreIndex] = resGenre.data.genre[0];
							$scope.editErrNote = undefined;
							$scope.editGenreVis = false;
							$location.path('/dashboard/genre');
						});
					} else {
						console.log('exist');
						$scope.editErrNote = 'Жанр уже существует';
					}
				}

				$scope.createGenre = function(genre) {

					if(!$scope.checkExist(genre.title)) {

						$http({
							url: '/api/genres/create',
							method: 'POST',
							data: genre
						})
						.then(function(genreRes) {
							$scope.errNote = undefined;
							$scope.genres.unshift(genreRes.data.genre);
						});
					} else {
						$scope.errNote = 'Жанр уже существует';
					}
				}

				$scope.checkExist = function(genre) {
					for(var i = 0; i < $scope.genres.length; i += 1) {
						if($scope.genres[i].title.toLowerCase() == genre.toLowerCase())
							return true;
					}
					return false;
				}

				$scope.deleteGenre = function(genre, index) {

					$http({
						url: '/api/genres/' + genre.id + '/delete',
						method: 'POST'
					})
					.then(function(genreRes) {
						$scope.genres.splice(index, 1);
					});
				}
			}
		])


		.controller('dashboardTracksCtrl', ['$scope', '$http', '$location', '$timeout', 'Upload', 
			function($scope, $http, $location, $timeout, Upload) {

				$http
					.get('/api/music')
					.then(function(music) {
						console.log(music.data);
						$scope.music = music.data;
					});

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
			}
		])

		.controller('dashboardAuthorsCtrl', ['$scope', '$http', 
			function($scope, $http) {

				$http
					.get('/api/author/albums')
					.then(function(authors) {
						console.log(authors);
						$scope.authors = authors.data.albums;
					});
			}
		]);




})();