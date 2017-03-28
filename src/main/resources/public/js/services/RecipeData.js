angular.module('recipesApp').factory('RecipeData', function($resource) {
	var recipeResource = $resource('/data/recipes/:_id', {_id: '@_id'});
	
	return {
		getRecipe: function(id) {
			return recipeResource.get({_id: id});
		},
		getAllRecipes: function() {
			return recipeResource.query();
		},
		//Restructure the Recipe object back to the format that the database is expecting
		saveRecipe: function(recipe) {
			var formattedRecipe = {
					'name': recipe.name,
					'ingredients': recipe.ingredients,
					'steps': recipe.steps,
					'tags': recipe.tags,
					'prepHours': recipe.prepTime.hours,
					'prepMinutes': recipe.prepTime.minutes,
					'cookHours': recipe.cookTime.hours,
					'cookMinutes': recipe.cookTime.minutes
			};
			if(typeof recipe.id != 'undefined') {
				formattedRecipe.id = recipe.id;
			}
			return recipeResource.save(formattedRecipe);
		},
		removeRecipe: function(id) {
			return recipeResource.remove({_id: id});
		}
	}
});