import { useState } from "react";
import { updateRecipe } from "../firebase";
import "../styles/EditRecipe.css";

interface EditRecipeProps {
  recipeId: string;
  recipe: any;
  onEditComplete: () => void;
}

const EditRecipe = ({ recipeId, recipe, onEditComplete }: EditRecipeProps) => {
  const [title, setTitle] = useState(recipe.title);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join(","));
  const [steps, setSteps] = useState(recipe.steps.join("."));

  const handleUpdate = () => {
    const updatedRecipe = {
      title,
      ingredients: ingredients.split(","),
      steps: steps.split("."),
    };
    updateRecipe(recipeId, updatedRecipe);
    onEditComplete(); // Notify parent that editing is complete
  };

  return (
    <div className="edit-recipe-container">
      <h2>Edit Recipe</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <textarea value={steps} onChange={(e) => setSteps(e.target.value)} />
      <button onClick={handleUpdate}>Update Recipe</button>
      <button onClick={onEditComplete}>Cancel</button>
    </div>
  );
};

export default EditRecipe;
