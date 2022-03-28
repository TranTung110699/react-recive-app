import React, { useEffect, useState } from "react";
import { Recipe } from "../../models/Recipe";
import { Ingredient } from "../../models/Ingredient";
import { RecipeNotFoundComponent } from "./RecipeNotFound";
import { Link, useParams, useNavigate } from "react-router-dom";
import { RecipeMap } from "../../models/maps";

interface RecipeDetailProps {
  getRecipe: (id: number) => Recipe | undefined;
  removeRecipe: (id: number) => void;
  importRecipeToCart: (id: number) => void;
  recipes: RecipeMap;
}

export const RecipeDetailComponent = ({
  getRecipe,
  removeRecipe,
  importRecipeToCart,
  recipes,
}: RecipeDetailProps) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe>();
  const { idStr } = useParams<{ idStr: any }>();
  const id: number = parseInt(idStr);

  useEffect(
    function () {
      if (typeof idStr !== "undefined")
        if (id.toString() === idStr) setRecipe(getRecipe(id));
    },
    [id, idStr, getRecipe]
  );

  if (typeof recipe === "undefined") {
    document.title = "Uh-oh!";
    return (
      <section className="col-md-8 py-4">
        <h2 className="sr-only">Error</h2>
        <div className="alert alert-info">Recipe does not exist...</div>
      </section>
    );
  }

  function handleClickRemoveRecipe() {
    removeRecipe(id);
    navigate("/recipes");
  }

  function handleClickImportRecipeToCart() {
    importRecipeToCart(id);
  }

  document.title = "View Recipe";
  const toggleDropdown = () => {
    setShow(!show);
  };
  return (
    <section className="col-md-8 py-4">
      <h2 className="sr-only">View recipe</h2>
      <div className="row mb-3">
        <div className="col">
          <img
            className="img-fluid"
            src={recipe.imgUrl}
            alt={recipe.description}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3 className="h2">{recipe.name}</h3>
        </div>
      </div>
      <div className="row mb-3">
        <div className={`dropdown ${show ? "show" : ""}`}>
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            onClick={toggleDropdown}
          >
            Manage Recipe
          </button>
          <div className={`dropdown-menu ${show ? "show" : ""}`}>
            <button
              className="dropdown-item"
              type="button"
              onClick={handleClickImportRecipeToCart}
            >
              To Shopping List
            </button>
            <Link to={`/recipes/${id}/edit`} className="dropdown-item">
              Edit Recipe
            </Link>
            <button
              className="dropdown-item text-danger"
              type="button"
              onClick={handleClickRemoveRecipe}
            >
              Delete Recipe
            </button>
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <p>{recipe.description}</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ul className="list-group">
            {recipe.ingredients.map((item, index) => (
              <li key={"ingredient-" + index} className="list-group-item">
                {`${item.name} - ${item.amount}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
