angular.module('recipesApp').factory('RecipeFilter', function() {
	
	function intersection(recipeTags, filterTags) {
		return recipeTags.filter(function(tag) {
			if(filterTags.indexOf(tag) !== -1) {
				return true;
			}
		}).filter(function(ele, index, arr) {
			return arr.indexOf(ele) === index;
		});
	}
	
	function allGoodTags(recipeTags, goodTags) {
		if(recipeTags.length < goodTags.length) {
			return false;
		}
		if(goodTags.length == 0) {
			return true;
		}
		var intersect = intersection(recipeTags, goodTags);
		
		return intersect.length == goodTags.length;
	}
	
	function noBadTags(recipeTags, badTags) {
		if(badTags.length == 0) {
			return true;
		}
		var intersect = intersection(recipeTags, badTags);
		
		return intersect.length == 0;
	}
	
	return {
		applyFilters: function(recipes, filter) {
			var goodTags = filter.filterTags.filter(function(tag) {
				return tag.good;
			}).map(function(tag) {
				return tag.description;
			});
			var badTags = filter.filterTags.filter(function(tag) {
				return !tag.good;
			}).map(function(tag) {
				return tag.description;
			});
			var recipeTags;
			recipes = recipes.filter(function(recipe) {
				recipeTags = recipe.tags.map(function(tag) {
					return tag.description;
				});
				return allGoodTags(recipeTags, goodTags) && noBadTags(recipeTags, badTags);
			});
			return recipes;
		}
	}
	
});