package com.RecipeRoulette.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.RecipeRoulette.model.Recipe;
import com.RecipeRoulette.repository.RecipeRepository;

@RestController
@RequestMapping("data/")
public class RecipeController {

	@Autowired
	private RecipeRepository recipeRepository;
	
	@RequestMapping(value = "recipes", method = RequestMethod.GET)
	public List<Recipe> list() {		
		return recipeRepository.findAll();
	}

	@RequestMapping(value = "recipes", method = RequestMethod.POST)
	public Recipe create(@RequestBody Recipe recipe) {
		int id = recipe.getId();
		if(id != 0) {
			Recipe existingRecipe = recipeRepository.findOne(id);
			recipeRepository.delete(existingRecipe);
		}
		return recipeRepository.saveAndFlush(recipe);
	}

	@RequestMapping(value = "recipes/{id}", method = RequestMethod.GET)
	public Recipe get(@PathVariable Integer id) {
		return recipeRepository.findOne(id);
	}

	@RequestMapping(value = "recipes/{id}", method = RequestMethod.DELETE)
	public Recipe delete(@PathVariable Integer id) {
		Recipe existingRecipe = recipeRepository.findOne(id);
		recipeRepository.delete(existingRecipe);
		return existingRecipe;
	}
}
