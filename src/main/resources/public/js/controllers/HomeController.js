angular.module('recipesApp').controller('HomeController', function($scope, $location, Roulette) {
	$scope.launchFilterEditor = function() {
		$location.url('/filter');
	};
	
	$scope.launchRecipeBrowser = function() {
		$location.url('/recipes');
	};
	
	$scope.launchRecipeRoulette = function() {
		Roulette.recipeRoulette('');
	}
});