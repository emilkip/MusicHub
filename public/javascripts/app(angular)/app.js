(function() {

	angular.module('MusicHub', [
		'ngRoute',
		'mainCtrl',
		'musicCtrl',
		'profileCtrl',
		'dashboardCtrl',
		'ngFileUpload'
	])
	.config(appConfig);


	function appConfig($routeProvider, $locationProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'javascripts/app/templates/main.html',
				controller: 'mainCtrl'
			})
			.when('/profile', {
				templateUrl: 'javascripts/app/templates/profile/own-profile.html',
				controller: 'profilePageCtrl'
			})
			.when('/profile/:username', {
				templateUrl: 'javascripts/app/templates/profile/profile.html',
				controller: ''
			})
			.when('/music/create', {
				templateUrl: 'javascripts/app/templates/music/create.html',
				controller: 'musicCreateCtrl'
			})
			.when('/music/genre/:title', {
				templateUrl: 'javascripts/app/templates/music/genre.html',
				controller: 'genreMusicCtrl'
			})
			.when('/music/:id/edit', {
				templateUrl: 'javascripts/app/templates/music/edit.html',
				controller: 'musicEditCtrl'
			})
			.when('/music/:id', {
				templateUrl: 'javascripts/app/templates/music/music.html',
				controller: 'musicPageCtrl'
			})
			.when('/playlist/:id/edit', {
				templateUrl: 'javascripts/app/templates/profile/editPlaylist.html',
				controller: 'playistEditCtrl'
			})
			.when('/dashboard', {
				templateUrl: 'javascripts/app/templates/dashboard/admin.html',
				controller: 'dashboardCtrl'
			})
			.when('/dashboard/genre', {
				templateUrl: 'javascripts/app/templates/dashboard/genre.html',
				controller: 'dashboardGenreCtrl'
			})
			.when('/dashboard/tracks', {
				templateUrl: 'javascripts/app/templates/dashboard/tracks.html',
				controller: 'dashboardTracksCtrl'
			})
			.when('/dashboard/authors', {
				templateUrl: 'javascripts/app/templates/dashboard/authors.html',
				controller: 'dashboardAuthorsCtrl'
			})
			.otherwise('/');
	}

})();

