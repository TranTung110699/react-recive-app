import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import { RecipeNotFoundComponent } from "./RecipeNotFound";
import { Recipe } from "../../models/Recipe";
import FieldErrorMsg from "./FieldErrror";
// import { generateKey } from "../utils/utils";
import { RecipeMap } from "../../models/maps";

interface RecipeFormEditProps {
  recipes: RecipeMap;
  addRecipe: (recipe: Recipe) => void;
  getRecipe: (id: number) => Recipe | undefined;
  editRecipe: (id: number, recipe: Recipe) => void;
  typeForm: string;
}

export const RecipeFormComponent = ({
  recipes,
  addRecipe,
  getRecipe,
  editRecipe,
  typeForm,
}: RecipeFormEditProps) => {
  const navigate = useNavigate();
  const [initialFormValues, setInitialFormValues] = useState<Recipe>({
    name: "",
    imgUrl: "",
    description: "",
    ingredients: [
      {
        name: "",
        amount: 0,
      },
    ],
  });

  const [recipe, setRecipe] = useState<Recipe>();
  const { idStr } = useParams<{ idStr: any }>();
  const id: number = parseInt(idStr);

  const editMode: boolean = typeof idStr !== "undefined";
  if (editMode) document.title = "Edit Recipe";
  else document.title = "New Recipe";

  useEffect(
    function () {
      if (editMode && id.toString() === idStr) setRecipe(getRecipe(id));
    },
    [id, idStr, editMode, getRecipe] // Only re-run the effect if changes
  );

  useEffect(
    function () {
      if (editMode && typeof recipe !== "undefined" && typeForm === "edit")
        setInitialFormValues(recipe);
    },
    [editMode, recipe, typeForm] // Only re-run the effect if changes
  );

  if (editMode && initialFormValues !== recipe) {
    document.title = "Uh-oh!";
    return (
      <section className="col-md-8 py-4">
        <h2 className="sr-only">Error</h2>
        <div className="alert alert-info">Recipe does not exist...</div>
      </section>
    );
  }

  const formValidationSchema = Yup.object({
    name: Yup.string().required("Required."),
    imgUrl: Yup.string().url("Must be a valid link.").required("Required."),
    description: Yup.string().required("Required."),
    ingredients: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Required."),
        amount: Yup.number()
          .min(1, "At least 1 is required.")
          .required("Required."),
      })
    ),
  });

  const handleSubmit = (
    values: Recipe,
    { setSubmitting, resetForm }: FormikHelpers<Recipe>
  ) => {
    if (editMode) editRecipe(id, values);
    else addRecipe(values);
    setSubmitting(false);
    // resetForm();
    navigate("/recipes");
  };

  const handleReset = () => {
    if (typeForm === "edit") {
      throw new Error("Cancel reset");
    }
  };

  function handleCancel() {
    return navigate("/recipes");
  }

  console.log(typeForm);

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
      validationSchema={formValidationSchema}
    >
      {({ values, isValid, dirty }) => (
        <Form>
          <div className="form-row">
            <div className="form-group col-auto">
              <button
                type="submit"
                className="btn btn-success"
                disabled={!(isValid && dirty)}
              >
                {typeForm === "create" ? "Add new" : "Save"}
              </button>
            </div>
            <div className="form-group col-auto">
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="recipe-name">Name</label>
            <Field
              className="form-control"
              type="text"
              name="name"
              id="recipe-name"
            />
            <FieldErrorMsg name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="recipe-image-url">Image URL</label>
            <Field
              className="form-control"
              type="text"
              name="imgUrl"
              id="recipe-image-url"
            />
            <FieldErrorMsg name="imgUrl" />
          </div>
          {values.imgUrl && (
            <div className="row my-4">
              <div className="col">
                <img className="img-fluid" src={values.imgUrl} alt="Preview" />
              </div>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="recipe-description">Description</label>
            <Field
              as="textarea"
              className="form-control"
              name="description"
              id="recipe-description"
              rows={6}
            />
            <FieldErrorMsg name="description" />
          </div>
          <FieldArray name="ingredients">
            {function ({ remove, push }) {
              return (
                <>
                  {values.ingredients.map((_, index) => (
                    <div className="form-row" key={"ingredient-" + index}>
                      <div className="form-group col-lg">
                        <label
                          htmlFor={`recipe-ingredient-${index}-name`}
                          className="sr-only"
                        >
                          Ingredient {index}
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          name={`ingredients.${index}.name`}
                          id={`recipe-ingredient-${index}-name`}
                          placeholder={`Ingredient ${index + 1}`}
                        />
                        <FieldErrorMsg name={`ingredients.${index}.name`} />
                      </div>
                      <div className="form-group col-lg-3">
                        <label
                          htmlFor={`recipe-ingredient-${index}-amount`}
                          className="sr-only"
                        >
                          Amount of ingredient {index}
                        </label>
                        <Field
                          className="form-control"
                          type="number"
                          name={`ingredients.${index}.amount`}
                          id={`recipe-ingredient-${index}-amount`}
                          placeholder="Amount"
                        />
                        <FieldErrorMsg name={`ingredients.${index}.amount`} />
                      </div>
                      <div className="form-group col-auto">
                        <button
                          className="btn btn-danger"
                          title={`Remove ingredient ${index + 1}`}
                          type="button"
                          onClick={() =>
                            values.ingredients.length > 1 && remove(index)
                          }
                        >
                          <span className="bi bi-x-lg"></span>
                        </button>
                      </div>
                    </div>
                  ))}
                  <hr className="mt-0" />
                  <div className="form-group">
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={() => push({ name: "", amount: 0 })}
                    >
                      Add ingredient
                    </button>
                  </div>
                </>
              );
            }}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};
