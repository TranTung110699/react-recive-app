import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { RecipeMap } from "../../models/maps";
import { Recipe } from "../../models/Recipe";

interface RecipeListProps {
  recipes: RecipeMap;
}

export const RecipeListComponent = ({ recipes }: RecipeListProps) => {
  console.log(recipes);
  return (
    <div className="list-group">
      {Array.from(recipes.entries()).map(([id, recipe]) => (
        <NavLink
          key={"recipe-" + id}
          to={`/recipes/${id}`}
          className={({ isActive }) =>
            "list-group-item list-group-item-action" +
            (isActive ? " active" : "")
          }
        >
          <div className="d-flex w-100 justify-content-between">
            <div>
              <h5 className="mb-1">{recipe.name}</h5>
              <p>{recipe.description}</p>
            </div>
            <div>
              <img src={recipe.imgUrl} width={50} height={50} alt="Recipe" />
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};
