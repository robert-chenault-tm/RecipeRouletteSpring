(function() {
	var recipesApp = angular.module('recipesApp', ['ngResource', 'ngRoute'])
		.config(function($routeProvider, $locationProvider){
			$routeProvider.when('/', {
				templateUrl: 'templates/Home.html',
				controller: 'HomeController'
			});
			$routeProvider.when('/recipes', {
				templateUrl: 'templates/RecipeList.html',
				controller: 'RecipeListController'
			});
			$routeProvider.when('/add', {
				templateUrl: 'templates/AddEditRecipe.html',
				controller: 'EditRecipeController'
			});
			$routeProvider.when('/edit/:recipeID', {
				templateUrl: 'templates/AddEditRecipe.html',
				controller: 'EditRecipeController'
			});
			$routeProvider.when('/filter', {
				templateUrl: 'templates/Filter.html',
				controller: 'FilterController'
			});
			$routeProvider.when('/roulette/:recipeID', {
				templateUrl: 'templates/Roulette.html',
				controller: 'RouletteController'
			});
			$routeProvider.otherwise({redirectTo: '/'});
			$locationProvider.html5Mode(true);
		});
}());