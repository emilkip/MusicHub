(function() {

	angular
		.module('mainCtrl', [])

		.controller('mainCtrl', ['$scope', '$http', 
			function($scope, $http) {

				$scope.searchBlockVis = false;
				$scope.filter = {};

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

				$http
					.get('/api/music')
					.then(function(music) {
						$scope.music = music.data;
					});


				$scope.showSB = function() {
					$scope.search = undefined;
					$scope.searchBlockVis = !$scope.searchBlockVis;
				}

				$scope.selectAuthor = function(author) {

					$scope.filter.author = {};
					$scope.filter.album = {};

					if(author != '') {
						var obj = JSON.parse(author);
						$scope.filter.author.title = obj.title;
						$scope.filter.album.title = '';

						$http({
							url: '/api/album',
							method: 'POST',
							data: { id: obj.id }
						})
						.then(function(albums) {
							$scope.albums = albums.data;
						});
					} else {
						$scope.filter.author.title = '';
					}
				}
			}
		]);

})();