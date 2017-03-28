angular.module('recipesApp').factory('Util', function() {
	return {
		getRandomInt: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}
});