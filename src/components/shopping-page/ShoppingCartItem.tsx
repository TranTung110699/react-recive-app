import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { Ingredient } from "../../models/Ingredient";
import * as Yup from "yup";
import FieldErrorMsg from "../recive-page/FieldErrror";

interface ShoppingCartItemProps {
  currentId: number;
  addCartItem: (item: Ingredient) => void;
  removeCartItem: (id: number) => void;
  getCartItem: (id: number) => Ingredient | undefined;
  updateCartItem: (id: number, item: Ingredient) => void;
  clearCart: () => void;
  showCartItemId: (id: number) => void;
}

export const ShoppingCartItemComponent = ({
  currentId,
  addCartItem,
  removeCartItem,
  getCartItem,
  updateCartItem,
  clearCart,
  showCartItemId,
}: ShoppingCartItemProps) => {
  const [modeAdd, setModeAdd] = useState<boolean>(true);
  const [initialFormValues, setInitialFormValues] = useState<Ingredient>({
    name: "",
    amount: 0,
  });

  useEffect(
    function () {
      if (currentId > -1) {
        setModeAdd(false);
        const cartItem = getCartItem(currentId);
        if (typeof cartItem !== "undefined") setInitialFormValues(cartItem);
      } else {
        setModeAdd(true);
      }
    },
    [currentId, getCartItem]
  );

  const formValidationSchema = Yup.object({
    name: Yup.string().required("Required."),
    amount: Yup.number()
      .min(1, "At least 1 is required.")
      .required("Required."),
  });

  function handleSubmit(
    values: Ingredient,
    { setSubmitting, resetForm }: FormikHelpers<Ingredient>
  ) {
    if (modeAdd) addCartItem(values);
    else updateCartItem(currentId, values);

    showCartItemId(-1);
    setInitialFormValues({
      name: "",
      amount: 0,
    });
    setModeAdd(true);
    resetForm();
    setSubmitting(false);
  }

  console.log(typeof getCartItem(currentId));

  function handleClickRemoveCartItem() {
    // resetForm();
    setInitialFormValues({
      name: "",
      amount: 0,
    });
    return removeCartItem(currentId);
  }
  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
      enableReinitialize
      validationSchema={formValidationSchema}
    >
      {function ({ isValid, dirty }) {
        return (
          <Form>
            <div className="form-row">
              <div className="form-group col-lg-5">
                <label htmlFor="shopping-item-name">Name</label>
                <Field
                  className="form-control"
                  type="text"
                  name="name"
                  id="shopping-item-name"
                />
                <FieldErrorMsg name="name" />
              </div>
              <div className="form-group col-auto">
                <label htmlFor="shopping-item-amount">Amount</label>
                <Field
                  className="form-control w-auto"
                  type="number"
                  name="amount"
                  id="shopping-item-amount"
                />
                <FieldErrorMsg name="amount" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-auto mb-0">
                <button
                  className="btn btn-success"
                  type="submit"
                  disabled={!(isValid && dirty)}
                >
                  {modeAdd ? "Add" : "Update"}
                </button>
              </div>
              {modeAdd ? (
                <></>
              ) : (
                <>
                  <div className="form-group col-auto mb-0">
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={handleClickRemoveCartItem}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
              <div className="form-group col-auto mb-0">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={clearCart}
                >
                  Clear
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
