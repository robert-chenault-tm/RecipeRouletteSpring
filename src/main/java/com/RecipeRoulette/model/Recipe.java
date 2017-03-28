package com.RecipeRoulette.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Recipe {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	private String name;
	private int prepHours;
	private int prepMinutes;
	private int cookHours;
	private int cookMinutes;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="recipe")
	@JsonManagedReference
	private List<Ingredient> ingredients = new ArrayList<Ingredient>();
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="recipe")
	@JsonManagedReference
	private List<Step> steps = new ArrayList<Step>();
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="recipe")
	@JsonManagedReference
	private List<Tag> tags = new ArrayList<Tag>();

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPrepHours() {
		return prepHours;
	}

	public void setPrepHours(int prepHours) {
		this.prepHours = prepHours;
	}

	public int getPrepMinutes() {
		return prepMinutes;
	}

	public void setPrepMinutes(int prepMinutes) {
		this.prepMinutes = prepMinutes;
	}

	public int getCookHours() {
		return cookHours;
	}

	public void setCookHours(int cookHours) {
		this.cookHours = cookHours;
	}

	public int getCookMinutes() {
		return cookMinutes;
	}

	public void setCookMinutes(int cookMinutes) {
		this.cookMinutes = cookMinutes;
	}

	public List<Ingredient> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}

	public List<Step> getSteps() {
		return steps;
	}

	public void setSteps(List<Step> steps) {
		this.steps = steps;
	}

	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}
}
