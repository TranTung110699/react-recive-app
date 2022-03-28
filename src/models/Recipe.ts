import { Ingredient } from "./Ingredient";

export interface Recipe {
  name: string;
  imgUrl: string;
  description: string;
  ingredients: Ingredient[];
}
