import React, { useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { RecipeDetailComponent } from "./components/recive-page/RecipeDetail";
import { RecipeFormComponent } from "./components/recive-page/RecipeForm";
import { RecipeListComponent } from "./components/recive-page/RecipeList";
import { Recipe } from "./models/Recipe";
import { Ingredient } from "./models/Ingredient";
import { RecipeHeaderComponent } from "./components/RecipeHeader";
import { ShoppingPageComponent } from "./components/shopping-page/ShoppingPage";
import { RecipesBookComponent } from "./components/recive-page/RecipeBook";
import { IngredientMap, RecipeMap } from "./models/maps";

const findIndexOfIngredient = (array: Ingredient[], ingredient: Ingredient) => {
  const index = array.findIndex(
    (item) => item.name == ingredient.name && item.amount == ingredient.amount
  );
  return index;
};

const App = () => {
  const [recipes, setRecipes] = useState<RecipeMap>(new Map());
  const [recipeId, setRecipeId] = useState<number>(0);
  const [cart, setCart] = useState<IngredientMap>(new Map());
  const [itemId, setItemId] = useState<number>(0);

  function addRecipe(recipe: Recipe): void {
    setRecipes((prev: RecipeMap) => new Map([...prev, [recipeId, recipe]]));
    setRecipeId(recipeId + 1);
  }

  function removeRecipe(id: number): void {
    setRecipes(function (prev: RecipeMap) {
      const newRecipeState = new Map(prev);
      newRecipeState.delete(id);
      return newRecipeState;
    });
  }

  function getRecipe(id: number): Recipe | undefined {
    return recipes.get(id);
  }

  function editRecipe(id: number, recipe: Recipe): void {
    setRecipes((prev: RecipeMap) => new Map(prev).set(id, recipe));
  }

  function addCartItem(item: Ingredient): void {
    setCart((prev: IngredientMap) => new Map([...prev, [itemId, item]]));
    setItemId(itemId + 1);
  }

  function removeCartItem(id: number): void {
    setCart(function (prev: IngredientMap) {
      const newCartState = new Map(prev);
      newCartState.delete(id);
      return newCartState;
    });
  }

  function getCartItem(id: number): Ingredient | undefined {
    return cart.get(id);
  }

  function updateCartItem(id: number, item: Ingredient): void {
    setCart((prev: IngredientMap) => new Map(prev).set(id, item));
  }

  function clearCart(): void {
    setCart(new Map());
  }

  function importRecipeToCart(id: number): void {
    const recipe = recipes.get(id);
    if (typeof recipe === "undefined") return;
    const newCart: IngredientMap = new Map(cart);
    let newItemId: number = itemId;

    recipe.ingredients.forEach(function (ingredient: Ingredient) {
      let notFound: boolean = true;
      for (let item of newCart.values())
        if (item.name === ingredient.name) {
          notFound = false;
          item.amount += ingredient.amount;
          break;
        }

      if (notFound) {
        newCart.set(newItemId, Object.assign({}, ingredient));
        newItemId++;
      }
    });

    setCart(newCart);
    setItemId(newItemId);
  }

  return (
    <div>
      <BrowserRouter>
        <RecipeHeaderComponent />

        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/recipes" replace />} />

            <Route
              path="/recipes"
              element={<RecipesBookComponent recipes={recipes} />}
            >
              <Route
                path="/recipes/:idStr/edit"
                element={
                  <RecipeFormComponent
                    getRecipe={getRecipe}
                    addRecipe={addRecipe}
                    editRecipe={editRecipe}
                    recipes={recipes}
                    typeForm={"edit"}
                  />
                }
              />

              <Route
                path="/recipes/create"
                element={
                  <RecipeFormComponent
                    getRecipe={getRecipe}
                    addRecipe={addRecipe}
                    editRecipe={editRecipe}
                    recipes={recipes}
                    typeForm={"create"}
                  />
                }
              />

              <Route
                path="/recipes/:idStr"
                element={
                  <RecipeDetailComponent
                    getRecipe={getRecipe}
                    removeRecipe={removeRecipe}
                    importRecipeToCart={importRecipeToCart}
                    recipes={recipes}
                  />
                }
              />

              <Route
                path="/recipes"
                element={<h1>Please select a Recipe!</h1>}
              />
            </Route>

            <Route
              path="/shopping-list"
              element={
                <ShoppingPageComponent
                  cartItems={cart}
                  addCartItem={addCartItem}
                  removeCartItem={removeCartItem}
                  getCartItem={getCartItem}
                  updateCartItem={updateCartItem}
                  clearCart={clearCart}
                />
              }
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
export default App;
