angular.module('recipesApp').controller('RouletteController', function($scope, $routeParams, RecipeData, Roulette) {
	RecipeData.getRecipe($routeParams.recipeID)
	.$promise
	.then(function(recipe) {
		$scope.recipe = {
				'name': recipe.name,
				'id': recipe.id,
				'ingredients': recipe.ingredients,
				'steps': recipe.steps,
				'tags': recipe.tags,
				'prepTime': {
					'hours': recipe.prepHours,
					'minutes': recipe.prepMinutes
				},
				'cookTime': {
					'hours': recipe.cookHours,
					'minutes': recipe.cookMinutes
				}
		};
	})
	.catch(function(response) {
		console.log(response);
	});
	
	$scope.reRoulette = function() {
		Roulette.recipeRoulette($scope.recipe.id)
	}
});