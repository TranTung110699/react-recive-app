import React, { useState } from "react";

export const RecipeNotFoundComponent = () => {
  document.title = "All Recipes";
  return (
    <section className="col-md-8 py-4">
      <h2 className="sr-only">View recipe</h2>
      <div className="alert alert-info">Please select a recipe!</div>
    </section>
  );
};
