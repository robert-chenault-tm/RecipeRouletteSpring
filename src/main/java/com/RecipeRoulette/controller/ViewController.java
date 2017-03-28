package com.RecipeRoulette.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

	//The SPA is on index.html, so routes must be forwarded back to it, or else refreshing will result in an error
	@RequestMapping({"/recipes", "/add", "/edit/{recipeID}", "/filter", "/roulette/{recipeID}"})
	public String index() {
		return "forward:/index.html";
	}
}
