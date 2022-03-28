import { Field, Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { Ingredient } from "../../models/Ingredient";
import { IngredientMap } from "../../models/maps";
import { ShoppingCartComponent } from "./ShoppingCart";
import { ShoppingCartItemComponent } from "./ShoppingCartItem";

interface ShoppingPageProps {
  cartItems: IngredientMap;
  addCartItem: (item: Ingredient) => void;
  removeCartItem: (id: number) => void;
  getCartItem: (id: number) => Ingredient | undefined;
  updateCartItem: (id: number, item: Ingredient) => void;
  clearCart: () => void;
}

export const ShoppingPageComponent = ({
  cartItems,
  addCartItem,
  removeCartItem,
  getCartItem,
  updateCartItem,
  clearCart,
}: ShoppingPageProps) => {
  document.title = "Shopping List";

  const [currentCartItemId, setCurrentCartItemId] = useState<number>(-1);
  function showCartItemId(id: number): void {
    setCurrentCartItemId(id);
  }
  return (
    <div className="row py-3">
      <div className="col">
        <ShoppingCartItemComponent
          currentId={currentCartItemId}
          addCartItem={addCartItem}
          removeCartItem={removeCartItem}
          getCartItem={getCartItem}
          updateCartItem={updateCartItem}
          clearCart={clearCart}
          showCartItemId={showCartItemId}
        />
        <hr />
        <ShoppingCartComponent
          cartItems={cartItems}
          currentItemId={currentCartItemId}
          showCartItemId={showCartItemId}
        />
      </div>
    </div>
  );
};
