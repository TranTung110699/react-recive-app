import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { RecipeMap } from "../../models/maps";
import { RecipeListComponent } from "./RecipeList";

interface RecivePageProps {
  recipes: RecipeMap;
}

export const RecipesBookComponent = ({ recipes }: RecivePageProps) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <Link to="/recipes/create" className="btn btn-success" role="button">
          New Recipe
        </Link>
        <hr />

        <RecipeListComponent recipes={recipes} />
      </div>
      <div className="col-md-6">
        <Outlet />
      </div>
    </div>
  );
};
