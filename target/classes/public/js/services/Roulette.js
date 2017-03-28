angular.module('recipesApp').factory('Roulette', function($location, RecipeData, FilterData, RecipeFilter, Util) {
	return {
		recipeRoulette: function(currentRecipeId) {
			RecipeData.getAllRecipes()
				.$promise
				.then(function(recipes) {
					FilterData.getFilter()
						.$promise
						.then(function(filter) {
							var filteredRecipes = RecipeFilter.applyFilters(recipes, filter);
							if(filteredRecipes.length < 1) {
								alert('Of the ' + recipes.length + ' recipes available, none match your current filters. Either broaden your filters or add more recipes.');
							} else if(filteredRecipes.length == 1 && currentRecipeId != '') {
								alert('Of the ' + recipes.length + ' recipes available, only this recipe matches your current filters. Either broaden your filters or add more recipes.');
							} else {
								if(currentRecipeId != ''){
									filteredRecipes = filteredRecipes.filter(function(obj){ return obj.id != currentRecipeId; });
								}
								var ind = Util.getRandomInt(0, filteredRecipes.length - 1);
								$location.url('/roulette/' + filteredRecipes[ind].id);
							}
						})
						.catch(function(response) {
							console.log(response)
						});
				})
				.catch(function(response) {
					console.log(response);
				});
		}
	}
});