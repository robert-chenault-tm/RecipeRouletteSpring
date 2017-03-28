package com.RecipeRoulette.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.RecipeRoulette.model.Filter;
import com.RecipeRoulette.repository.FilterRepository;

@RestController
@RequestMapping("data/")
public class FilterController {

	@Autowired
	private FilterRepository filterRepository;
	
	@RequestMapping(value = "filters", method = RequestMethod.GET)
	public Filter get() {	
		List<Filter> filters = filterRepository.findAll();
		Filter retFilter;
		if(filters.size() > 0) {
			retFilter = filters.get(0);
		} else {
			retFilter = new Filter();
		}
		return retFilter;
	}

	@RequestMapping(value = "filters", method = RequestMethod.POST)
	public Filter create(@RequestBody Filter filter) {
		int id = filter.getId();
		if(id != 0) {
			Filter existingFilter = filterRepository.findOne(id);
			filterRepository.delete(existingFilter);
		}
		return filterRepository.saveAndFlush(filter);
	}
}
