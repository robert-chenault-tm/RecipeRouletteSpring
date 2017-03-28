package com.RecipeRoulette.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.RecipeRoulette.model.Filter;

public interface FilterRepository extends JpaRepository<Filter, Integer> {
}
