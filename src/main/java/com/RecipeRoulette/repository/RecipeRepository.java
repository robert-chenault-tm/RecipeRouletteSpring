package com.RecipeRoulette.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.RecipeRoulette.model.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
}
