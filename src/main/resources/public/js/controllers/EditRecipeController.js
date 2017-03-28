angular.module('recipesApp').controller('EditRecipeController', function($scope, $routeParams, $location, RecipeData) {
	if($routeParams.recipeID != null){
		RecipeData.getRecipe($routeParams.recipeID)
			.$promise
			.then(function(recipe) {
				//Two way binding can be wonky with primitives, so pack the prep and cook info into objects
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
				$scope.title = 'Edit ' + $scope.recipe.name;
				$scope.origName = $scope.recipe.name;
				$scope.removable = true;
				$scope.sendingToDB = false;
			})
			.catch(function(response){
				console.log(response);
			});
	} else {
		$scope.title = 'Add a new recipe';
		$scope.recipe = {'name': '',
							'ingredients': [
								{
									'amount': '',
									'measurement': '',
									'ingredient': ''
								}
							],
							'steps': [
								{
									'step': '',
									'stepNumber': 1
								}
							],
							'tags': [{
								'description': ''
							}],
							'prepTime': {
								'hours': '',
								'minutes': ''
							},		
							'cookTime': {
								'hours': '',
								'minutes': ''
							}
						};
		$scope.origName = '';
		$scope.removable = false;
		$scope.sendingToDB = false;
	}
	
	$scope.saveRecipe = function(recipe, form) {
		if(form.$valid) {
			//Remove empty tags
			recipe.tags = recipe.tags.filter(function(obj){
				return obj.description != '';
			});
			recipe.tags = recipe.tags.map(function(obj) {
				obj.description = obj.description.toLowerCase();
				return obj;
			});
			RecipeData.saveRecipe(recipe)
			.$promise
			.then(function(recipe) {
				$location.url('/recipes');
			})
			.catch(function(response){
				console.log(response);
				alert('An error occurred while saving your recipe.');
				$location.url('/recipes');
			});
			//Prevent save / delete from being clicked multiple times in the event the use is spamming the button or something causes the promise to take longer than usual
			$scope.sendingToDB = true;
		}		
	}
	
	$scope.addNewIngredientRow = function() {
		$scope.recipe.ingredients.push({
			'amount': '',
			'measurement': '',
			'ingredient': ''
		});
	}
	
	$scope.removeIngredientRow = function(element) {
		var ingredients = $scope.recipe.ingredients;
		var ind = $scope.recipe.ingredients.indexOf(element.ingredient);
		if(ind == -1) {
			console.log('Selected ingredient does not seem to be in the array of ingredients');
		} else if($scope.recipe.ingredients.length != 1) {
			if(ind == 0) {
				$scope.recipe.ingredients.shift();
			} else if(ind == $scope.recipe.ingredients.length - 1) {
				$scope.recipe.ingredients.pop();
			} else {
				$scope.recipe.ingredients.splice(ind, 1);
			}
		} else {
			ingredients[0] = {
				'amount': '',
				'measurement': '',
				'ingredient': ''
			};
		}
		
	}
	
	$scope.addNewStepRow = function(element) {
		var ind = $scope.recipe.steps.indexOf(element.step);
		var newStep = {
				'step': '',
				'stepNumber': element.step.stepNumber + 1
		};
		$scope.recipe.steps = $scope.recipe.steps.map(function(obj) {
			if(obj.stepNumber > element.step.stepNumber) {
				obj.stepNumber++;
			}
			return obj;
		});
		$scope.recipe.steps.splice(ind + 1, 0, newStep);
	}
	
	$scope.removeStepRow = function(element) {
		var ind = $scope.recipe.steps.indexOf(element.step);
		if(ind == -1) {
			console.log('Selected step does not seem to be in the array of steps');
		} else if($scope.recipe.steps.length != 1) {
			if(ind == 0) {
				$scope.recipe.steps.shift();
				$scope.recipe.steps = $scope.recipe.steps.map(function(obj) {
					obj.stepNumber--;
					return obj;
				});
			} else if(ind == $scope.recipe.steps.length - 1) {
				$scope.recipe.steps.pop();
			} else {
				$scope.recipe.steps.splice(ind, 1);
				$scope.recipe.steps = $scope.recipe.steps.map(function(obj) {
					if(obj.stepNumber > element.step.stepNumber) {
						obj.stepNumber--;
					}
					return obj;
				});
			}
		} else {
			$scope.recipe.steps[0].step = '';
		}		
	}
	

	
	$scope.upStepNumber = function(element) {
		var stepNum = element.step.stepNumber;
		if($scope.recipe.steps.length != 1) {
			if(stepNum != 1) {
				$scope.recipe.steps.find(function(obj) {return obj.stepNumber == stepNum - 1;}).stepNumber = stepNum;
				element.step.stepNumber = stepNum - 1;
			}
		}
	}
	
	$scope.downStepNumber = function(element) {
		var stepNum = element.step.stepNumber;
		if($scope.recipe.steps.length != 1) {
			if(stepNum != $scope.recipe.steps.length) {
				$scope.recipe.steps.find(function(obj) {return obj.stepNumber == stepNum + 1;}).stepNumber = stepNum;
				element.step.stepNumber = stepNum + 1;
			}
		}
	}
	
	$scope.addNewTagRow = function() {
		$scope.recipe.tags.push({
			'description': ''
		});
	}	
	
	$scope.removeTagRow = function(element) {
		var ind = $scope.recipe.tags.indexOf(element.tag);
		if(ind == -1) {
			console.log('Selected tag does not seem to be in the array of tags');
		} else if($scope.recipe.tags.length != 1) {
			if(ind == 0) {
				$scope.recipe.tags.shift();
			} else if(ind == $scope.recipe.tags.length - 1) {
				$scope.recipe.tags.pop();
			} else {
				$scope.recipe.tags.splice(ind, 1);
			}
		} else {
			$scope.recipe.tags[0].description = '';
		}
	}
	
	$scope.deleteRecipe = function(recipe) {
		if(confirm('This recipe will be deleted. This cannot be undone.')) {
			RecipeData.removeRecipe(recipe.id)
			.$promise
			.then(function(recipe) {
				$location.url('/recipes');
			})
			.catch(function(response){
				console.log(response);
				alert('An error occurred while deleting your recipe.');
				$location.url('/recipes');
			});
			//Prevent save / delete from being clicked multiple times in the event the use is spamming the button or something causes the promise to take longer than usual
			sendingToDB = true;
		}
		
	}
	
});