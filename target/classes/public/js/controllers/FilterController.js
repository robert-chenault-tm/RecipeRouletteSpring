angular.module('recipesApp').controller('FilterController', function($scope, $location, FilterData) {
	FilterData.getFilter()
		.$promise
		.then(function(filter) {
			$scope.filter = {};
			$scope.filter.goodTags = filter.filterTags.filter(function(tag) {
				return tag.good;
			});
			$scope.filter.badTags = filter.filterTags.filter(function(tag) {
				return !tag.good;
			});
			$scope.filter.id = filter.id;
			if($scope.filter.goodTags.length == 0) {
				$scope.filter.goodTags.push({'description':'', 'good': true});
			}
			if($scope.filter.badTags.length == 0) {
				$scope.filter.badTags.push({'description':'', 'good': false});
			}
		})
		.catch(function(response) {
			console.log(response);
		});
	
	$scope.removeTag = function(element) {
		var type = element.tag.good;
		var tags;
		if(type) {
			tags = $scope.filter.goodTags;
		} else {
			tags = $scope.filter.badTags;
		}
		
		var ind = tags.indexOf(element.tag);
		if(ind == -1) {
			console.log('Selected tag does not seem to be in the array of tags');
		} else if(tags.length != 1) {
			if(ind == 0) {
				tags.shift();
			} else if(ind == tags.length - 1) {
				tags.pop()
			} else {
				tags.splice(ind, 1)
			}
		} else {
			tags[0].description = '';
		}
	}
	
	$scope.addTag = function(type){
		if(type == 'good')  {
			$scope.filter.goodTags.push({'description':'', 'good': true});
		} else if(type == 'bad') {
			$scope.filter.badTags.push({'description':'', 'good': false});
		} else {
			console.log('Invalid tag type, received tag type of' + type);
		}
	}
	
	$scope.saveFilter = function(filter) {
		filter.goodTags = filter.goodTags.map(function(tag) {
			return tag.description;
		})
		//Remove empty tags
		.filter(function(tag){
			return tag != '';
		})
		.map(function(tag) {
			return tag.toLowerCase();
		})
		//Remove duplicates
		.filter(function(tag, index, arr) {
			return arr.indexOf(tag) === index;
		})
		//Reconstruct the object to be sent to the db
		.map(function(tag) {
			return {
				'description': tag,
				'good': true
			}
		});
		
		filter.badTags = filter.badTags.map(function(tag) {
			return tag.description;
		})
		//Remove empty tags
		.filter(function(tag){
			return tag != '';
		})
		.map(function(tag) {
			return tag.toLowerCase();
		})
		//Remove duplicates
		.filter(function(tag, index, arr) {
			return arr.indexOf(tag) === index;
		})
		//Reconstruct the object to be sent to the db
		.map(function(tag) {
			return {
				'description': tag,
				'good': false
			}
		});
		
		var tags = filter.goodTags.concat(filter.badTags);
		var retFilter = {
				'id': filter.id,
				'filterTags': tags
		}
		FilterData.saveFilter(retFilter);
		$location.url('/');
	}
});