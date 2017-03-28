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
public class Filter {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="filter")
	@JsonManagedReference
	private List<FilterTag> filterTags = new ArrayList<FilterTag>();

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<FilterTag> getIngredients() {
		return filterTags;
	}

	public void setIngredients(List<FilterTag> ingredients) {
		this.filterTags = ingredients;
	}
}
