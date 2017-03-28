angular.module('recipesApp').factory('FilterData', function($resource) {
	var resource = $resource('/data/filters/');
	
	return {
		getFilter: function() {
			return resource.get();
		},
		saveFilter: function(filter) {
			return resource.save(filter);
		}
	}
});