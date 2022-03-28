import { Field, Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { Ingredient } from "../../models/Ingredient";
import { IngredientMap } from "../../models/maps";

interface ShoppingCartProps {
  cartItems: IngredientMap;
  currentItemId: number;
  showCartItemId: (id: number) => void;
}

export const ShoppingCartComponent = ({
  cartItems,
  currentItemId,
  showCartItemId,
}: ShoppingCartProps) => {
  if (cartItems.size === 0) return <></>;
  return (
    <ul className="list-group">
      {Array.from(cartItems.entries()).map(function ([id, item]) {
        return (
          <li
            key={"cart-item-" + id}
            className={
              "list-group-item" + (id === currentItemId ? " active" : "")
            }
            role="button"
            onClick={() => showCartItemId(id)}
          >
            {`${item.name} (${item.amount})`}
          </li>
        );
      })}
    </ul>
  );
};
