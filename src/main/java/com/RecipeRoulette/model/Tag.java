package com.RecipeRoulette.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Tag {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private String description;
	
	@ManyToOne
	@JoinColumn(name="RECIPE_ID", referencedColumnName="ID")
	@JsonBackReference
	private Recipe recipe;

	public String getDescription() {
		return description;
	}

	public int getId() {
		return id;
	}

	public Recipe getRecipe() {
		return recipe;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}
}
